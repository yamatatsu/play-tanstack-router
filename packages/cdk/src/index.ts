import * as cdk from "aws-cdk-lib";
import { BackendStack } from "./backend";
import { ENV_NAME, STACK_ENV } from "./constants";

const prefix = `${ENV_NAME}Grafana`;

const app = new cdk.App();

new BackendStack(app, `${prefix}BackendStack`, {
	envName: ENV_NAME,
	prefix,
	env: STACK_ENV,
});
