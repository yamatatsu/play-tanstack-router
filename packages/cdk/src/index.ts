import * as cdk from "aws-cdk-lib";
import { ApplicationStack } from "./application";
import { ENV_NAME, STACK_ENV } from "./constants";

const prefix = `${ENV_NAME}Boilerplate`;

const app = new cdk.App();

new ApplicationStack(app, `${prefix}AppStack`, {
	envName: ENV_NAME,
	prefix,
	env: STACK_ENV,
});
