import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as ecs from "aws-cdk-lib/aws-ecs";
import * as logs from "aws-cdk-lib/aws-logs";
import type * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { Construct } from "constructs";

interface Props {
	vpc: ec2.IVpc;
	dbRootSecret: secretsmanager.ISecret;
	prefix: string;
	envName: string;
}
/**
 * - Fargate for putting data
 */
export class DataPutter extends Construct {
	public readonly fargateConnections: ec2.IConnectable;

	constructor(scope: Construct, id: string, props: Props) {
		super(scope, id);

		const { vpc, dbRootSecret } = props;

		const cluster = new ecs.Cluster(this, "Cluster", {
			vpc,
			// containerInsights: true,
		});

		const taskDef = new ecs.FargateTaskDefinition(this, "TaskDefinition", {
			cpu: 256,
			memoryLimitMiB: 512,
			runtimePlatform: {
				cpuArchitecture: ecs.CpuArchitecture.ARM64,
			},
		});

		const plcFaceContainer = taskDef.addContainer("PlcFake", {
			image: ecs.ContainerImage.fromAsset("../../", {
				target: "plc-fake",
				ignoreMode: cdk.IgnoreMode.DOCKER,
				exclude: ["**/node_modules", ".git", "**/cdk.out"],
			}),
			logging: ecs.LogDriver.awsLogs({
				streamPrefix: "PlcFake",
				logRetention: logs.RetentionDays.THREE_MONTHS,
			}),
			secrets: {
				DB_HOST: ecs.Secret.fromSecretsManager(dbRootSecret, "host"),
				DB_DBNAME: ecs.Secret.fromSecretsManager(dbRootSecret, "dbname"),
				DB_USERNAME: ecs.Secret.fromSecretsManager(dbRootSecret, "username"),
				DB_PASSWORD: ecs.Secret.fromSecretsManager(dbRootSecret, "password"),
			},
			// The npm library `tsx` needs to write to the filesystem.
			readonlyRootFilesystem: false,
		});

		const dbMigrationContainer = taskDef.addContainer("DBMigration", {
			image: ecs.ContainerImage.fromAsset("../../", {
				target: "plc-fake",
				ignoreMode: cdk.IgnoreMode.DOCKER,
				exclude: ["**/node_modules", ".git", "**/cdk.out"],
			}),
			command: ["pnpm", "prisma", "migrate", "deploy"],
			logging: ecs.LogDriver.awsLogs({
				streamPrefix: "DBMigration",
				logRetention: logs.RetentionDays.THREE_MONTHS,
			}),
			secrets: {
				DB_HOST: ecs.Secret.fromSecretsManager(dbRootSecret, "host"),
				DB_DBNAME: ecs.Secret.fromSecretsManager(dbRootSecret, "dbname"),
				DB_USERNAME: ecs.Secret.fromSecretsManager(dbRootSecret, "username"),
				DB_PASSWORD: ecs.Secret.fromSecretsManager(dbRootSecret, "password"),
			},
			essential: false,
			readonlyRootFilesystem: true,
		});

		plcFaceContainer.addContainerDependencies({
			container: dbMigrationContainer,
			condition: ecs.ContainerDependencyCondition.COMPLETE,
		});

		const fargateService = new ecs.FargateService(this, "FargateService", {
			cluster,
			vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
			taskDefinition: taskDef,
			desiredCount: 1,
			maxHealthyPercent: 200,
			minHealthyPercent: 50,
			// enableExecuteCommand: true,
			circuitBreaker: {
				enable: true,
				rollback: false,
			},
		});

		this.fargateConnections = fargateService.connections;
	}
}
