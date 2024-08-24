import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { Aurora } from "./aurora";
import { Cognito } from "./cognito";
import { DataPutter } from "./data-putter";
import { Vpc } from "./vpc";

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

		const vpc = new Vpc(this, "Vpc");

		const aurora = new Aurora(this, "Aurora", {
			...props,
			vpc: vpc.vpc,
		});

		const dataPutter = new DataPutter(this, "DataPutter", {
			...props,
			vpc: vpc.vpc,
			dbRootSecret: aurora.dbRootSecret,
		});

		vpc.allowOutboundFrom(aurora.bastion);
		vpc.allowOutboundFrom(dataPutter.fargateConnections);
		aurora.allowAccessDBFrom(dataPutter.fargateConnections);
	}
}
