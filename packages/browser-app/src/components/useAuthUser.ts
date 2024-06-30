import { type AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function useAuthUser() {
	const [user, setUser] = useState<AuthUser | null>(null);

	useEffect(() => {
		getCurrentUser()
			.then((_user) => {
				setUser(_user);
			})
			.catch((error) => {
				console.error(error);
				console.log("Not signed in");
			});
	}, []);

	return user;
}
