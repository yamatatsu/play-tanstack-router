import "@aws-amplify/ui-react/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Amplify } from "aws-amplify";
import React from "react";
import ReactDOM from "react-dom/client";

import "@/globals.css";
import NotFound from "@/components/error-pages/NotFound";
import { routeTree } from "@/routeTree.gen";

Amplify.configure({
	version: "1",
	auth: {
		aws_region: import.meta.env.VITE_AWS_REGION,
		authentication_flow_type: "USER_SRP_AUTH",
		user_pool_id: import.meta.env.VITE_USER_POOL_ID,
		user_pool_client_id: import.meta.env.VITE_USER_POOL_CLIENT_ID,
	},
});

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
	root.render(
		<React.StrictMode>
			<Authenticator hideSignUp>
				<RouterProvider router={router} />
			</Authenticator>
		</React.StrictMode>,
	);
}
