import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import * as rds from "aws-cdk-lib/aws-rds";
import type { Construct } from "constructs";
import { Cognito } from "./cognito";

type Props = cdk.StackProps & {
	envName: string;
	prefix: string;
};
export class BackendStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: Props) {
		super(scope, id, props);

		new Cognito(this, "Cognito", {
			...props,
		});

		const natProvider = ec2.NatProvider.instanceV2({
			instanceType: ec2.InstanceType.of(
				ec2.InstanceClass.T4G,
				ec2.InstanceSize.NANO,
			),
			machineImage: ec2.MachineImage.latestAmazonLinux2023({
				cpuType: ec2.AmazonLinuxCpuType.ARM_64,
			}),
			defaultAllowedTraffic: ec2.NatTrafficDirection.OUTBOUND_ONLY,
		});

		const vpc = new ec2.Vpc(this, "Vpc", {
			// natGateways: 1,
			natGatewayProvider: natProvider,
			subnetConfiguration: [
				{
					cidrMask: 24,
					name: "Public",
					subnetType: ec2.SubnetType.PUBLIC,
				},
				{
					cidrMask: 24,
					name: "Private",
					subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
				},
				{
					cidrMask: 24,
					name: "Isolated",
					subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
				},
			],
		});
		vpc.addGatewayEndpoint(`${id}-S3EndpointForPrivate`, {
			service: ec2.GatewayVpcEndpointAwsService.S3,
			subnets: [{ subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS }],
		});

		const bastion = new ec2.BastionHostLinux(this, "BastionHost", {
			vpc,
			subnetSelection: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
		});
		bastion.connections.allowTo(
			natProvider.securityGroup,
			ec2.Port.allTraffic(),
		);

		const auroraCluster = new rds.DatabaseCluster(this, "Aurora", {
			vpc,
			vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
			engine: rds.DatabaseClusterEngine.auroraMysql({
				version: rds.AuroraMysqlEngineVersion.VER_3_06_0,
			}),
			credentials: rds.Credentials.fromGeneratedSecret("admin"),
			defaultDatabaseName: "mydb",
			writer: rds.ClusterInstance.provisioned("writer", {
				publiclyAccessible: false,
			}),
			parameterGroup: new rds.ParameterGroup(
				this,
				`${id}-aurora-parameters-group`,
				{
					engine: rds.DatabaseClusterEngine.auroraMysql({
						version: rds.AuroraMysqlEngineVersion.VER_3_06_0,
					}),
					parameters: {
						character_set_server: "utf8mb4",
						character_set_client: "utf8mb4",
						server_audit_logging: "1", // 監査ログ
						server_audit_events: "CONNECT,QUERY,TABLE", // 出力する監査ログの種類
					},
				},
			),
			preferredMaintenanceWindow: "Sat:17:00-Sat:17:30",
			removalPolicy: cdk.RemovalPolicy.DESTROY,
		});
		auroraCluster.connections.allowFrom(bastion, ec2.Port.tcp(3306));
	}
}
