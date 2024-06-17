import { Outlet, createRootRoute } from "@tanstack/react-router";

import SideNav from "@/components/SideNav.tsx";

export const Route = createRootRoute({
	component: () => (
		<div className="flex flex-row">
			<div>
				<SideNav />
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	),
});
