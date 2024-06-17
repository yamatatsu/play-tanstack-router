import { Outlet, createRootRoute } from "@tanstack/react-router";
import React from "react";

// see, https://tanstack.com/router/latest/docs/framework/react/devtools#only-importing-and-using-devtools-in-development
const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null
		: React.lazy(() =>
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
				})),
			);

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
