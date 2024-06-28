import * as cdk from "aws-cdk-lib";
import type { Construct } from "constructs";
import { Cognito } from "./cognito";

type Props = cdk.StackProps & {
	envName: string;
	prefix: string;
};
export class ApplicationStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: Props) {
		super(scope, id, props);

		new Cognito(this, "Cognito", {
			...props,
		});
	}
}
