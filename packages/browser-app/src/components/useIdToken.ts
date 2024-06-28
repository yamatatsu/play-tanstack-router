import { fetchAuthSession } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export function useIdToken(): string | null {
	const [idToken, setIdToken] = useState<string | null>(null);

	useEffect(() => {
		fetchAuthSession().then((session) => {
			setIdToken(session.tokens?.idToken?.toString() ?? null);
		});
	}, []);

	return idToken;
}
