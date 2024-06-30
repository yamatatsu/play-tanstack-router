import {
	type AuthUser,
	getCurrentUser,
	signInWithRedirect,
} from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import { useEffect, useState } from "react";

/**
 * 未認証の場合、Cognito Hosted UIにリダイレクトする。
 * main.tsxでのみ使われることを想定している。
 * @see https://docs.amplify.aws/gen1/react/build-a-backend/auth/add-social-provider/
 */
export default function useAuth() {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [error, setError] = useState<unknown>(null);

	useEffect(() => {
		const unsubscribe = Hub.listen("auth", ({ payload }) => {
			switch (payload.event) {
				case "signInWithRedirect":
					getUser();
					break;
				case "signInWithRedirect_failure":
					setError("An error has occurred during the OAuth flow.");
					break;
			}
		});

		getUser();

		return unsubscribe;
	}, []);

	const getUser = async (): Promise<void> => {
		try {
			const currentUser = await getCurrentUser();
			setUser(currentUser);
		} catch (error) {
			console.error(error);
			console.log("Not signed in");

			signInWithRedirect();
		}
	};

	return { user, error };
}
