import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute(
	"/site/$siteId/dashboard/equipment-status",
)({
	component: Component,
});

function Component() {
	return (
		<div className="flex flex-col p-8 mx-auto">
			<h1 className="text-5xl font-extrabold">Equipment Status</h1>
		</div>
	);
}
