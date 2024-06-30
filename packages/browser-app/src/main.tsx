import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Amplify, type ResourcesConfig } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";

import "@/globals.css";
import NotFound from "@/components/error-pages/NotFound";
import useAuth from "@/components/useAuth";
import { routeTree } from "@/routeTree.gen";

const resourceConfig = {
	Auth: {
		Cognito: {
			userPoolId: import.meta.env.VITE_USER_POOL_ID,
			userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID,
			loginWith: {
				oauth: {
					domain: `${import.meta.env.VITE_USER_POOL_DOMAIN}.auth.${import.meta.env.VITE_AWS_REGION}.amazoncognito.com`,
					scopes: [
						"openid",
						"email",
						"profile",
						"aws.cognito.signin.user.admin",
					],
					redirectSignIn: ["http://localhost:5173/"],
					redirectSignOut: ["http://localhost:5173/"],
					responseType: "code",
				},
			},
		},
	},
} satisfies ResourcesConfig;

Amplify.configure(resourceConfig);

const router = createRouter({ routeTree, defaultNotFoundComponent: NotFound });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error("No root element found");
}

if (!rootElement?.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<Main />);
}

function Main() {
	const user = useAuth();
	return (
		<React.StrictMode>
			{!user ? "Redirecting..." : <RouterProvider router={router} />}
		</React.StrictMode>
	);
}
