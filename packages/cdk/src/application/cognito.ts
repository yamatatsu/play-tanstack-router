import * as cdk from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

interface Props {
	prefix: string;
	envName: string;
}
export class Cognito extends Construct {
	constructor(scope: Construct, id: string, props: Props) {
		super(scope, id);
		const { prefix } = props;

		const userPool = new cognito.UserPool(this, `${prefix}UserPool`, {
			selfSignUpEnabled: false,
			signInAliases: {
				username: false,
				email: true,
			},
			passwordPolicy: {
				tempPasswordValidity: cdk.Duration.days(7),
				requireLowercase: false,
				requireUppercase: false,
				requireDigits: false,
				requireSymbols: false,
			},
			email: cognito.UserPoolEmail.withCognito(),
			accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
			deviceTracking: {
				challengeRequiredOnNewDevice: true,
				deviceOnlyRememberedOnUserPrompt: true,
			},

			removalPolicy: cdk.RemovalPolicy.DESTROY,
			deletionProtection: false,
		});

		userPool.addClient(`${prefix}UserPoolClient`, {
			userPoolClientName: `${prefix}Application`,
			generateSecret: false,
			authFlows: {
				userPassword: true,
				adminUserPassword: true,
			},
			oAuth: {
				flows: {
					authorizationCodeGrant: true,
				},
				scopes: [
					cognito.OAuthScope.OPENID,
					cognito.OAuthScope.EMAIL,
					cognito.OAuthScope.PROFILE,
					cognito.OAuthScope.COGNITO_ADMIN,
				],
				callbackUrls: ["http://localhost:5173/"],
				logoutUrls: ["http://localhost:5173/"],
			},
			preventUserExistenceErrors: true,
			accessTokenValidity: cdk.Duration.minutes(60),
			idTokenValidity: cdk.Duration.minutes(60),
			refreshTokenValidity: cdk.Duration.days(1),
		});

		userPool.addDomain(`${prefix}UserPoolDomain`, {
			cognitoDomain: {
				domainPrefix: "yamatatsu-grafana-app-boilerplate",
			},
		});
	}
}
