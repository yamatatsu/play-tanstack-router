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
			authFlows: {
				userSrp: true,
			},
			oAuth: {
				flows: {
					implicitCodeGrant: true,
				},
				scopes: [
					cognito.OAuthScope.EMAIL,
					cognito.OAuthScope.OPENID,
					cognito.OAuthScope.PROFILE,
				],
				callbackUrls: ["http://localhost:3000"],
				logoutUrls: ["http://localhost:3000"],
			},
			supportedIdentityProviders: [
				cognito.UserPoolClientIdentityProvider.COGNITO,
			],
			preventUserExistenceErrors: true,
			accessTokenValidity: cdk.Duration.minutes(60),
			idTokenValidity: cdk.Duration.minutes(60),
			refreshTokenValidity: cdk.Duration.days(1),
		});
	}
}
