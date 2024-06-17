import { Outlet, createRootRoute } from "@tanstack/react-router";

import GlobalHeader from "@/components/GlobalHeader.tsx";

export const Route = createRootRoute({
	component: () => (
		<>
			<GlobalHeader />
			<Outlet />
		</>
	),
});
