import { type AuthSession, fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthSession() {
	const [session, setSession] = useState<AuthSession | null>(null);

	useEffect(() => {
		fetchAuthSession()
			.then((_session) => {
				setSession(_session);
			})
			.catch((error) => {
				console.error(error);
				console.log("Not signed in");
			});
	}, []);

	return session;
}
