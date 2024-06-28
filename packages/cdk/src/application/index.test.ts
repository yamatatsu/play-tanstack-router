import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as synthetics from "aws-cdk-lib/aws-synthetics";
import { expect, test, vi } from "vitest";
import { ApplicationStack } from ".";

vi.spyOn(lambda.Code, "fromAsset").mockReturnValue(
	lambda.Code.fromInline("dummy") as unknown as lambda.AssetCode,
);
vi.spyOn(synthetics.Code, "fromAsset").mockReturnValue(
	synthetics.Code.fromInline("dummy") as unknown as synthetics.AssetCode,
);

test("Snapshot test", () => {
	const app = new cdk.App();

	const stack = new ApplicationStack(app, "Target", {
		envName: "test",
		prefix: "test-prefix",
	});

	const template = Template.fromStack(stack);
	expect(template.toJSON()).toMatchSnapshot();
});
