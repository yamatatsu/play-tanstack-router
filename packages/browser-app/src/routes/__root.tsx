import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import GlobalHeader from "@/components/GlobalHeader.tsx";
import SideNav from "@/components/SideNav.tsx";

export const Route = createRootRoute({
	component: () => (
		<>
			<GlobalHeader />
			<div className="flex flex-row">
				<div>
					<SideNav />
				</div>
				<div>
					<Outlet />
				</div>
			</div>
			<TanStackRouterDevtools />
		</>
	),
});
