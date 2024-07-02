import { Outlet, createFileRoute } from "@tanstack/react-router";

import SideNav from "@/components/SideNav.tsx";

export const Route = createFileRoute("/site/$siteId")({
	component: () => {
		return (
			<>
				<SideNav>
					<Outlet />
				</SideNav>
			</>
		);
	},
});
