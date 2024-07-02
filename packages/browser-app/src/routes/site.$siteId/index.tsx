import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/site/$siteId/")({
	beforeLoad: async ({ params: { siteId } }) => {
		throw redirect({ to: `/site/${siteId}/dashboard` });
	},
});
