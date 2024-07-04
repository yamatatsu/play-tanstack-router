import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/site/$siteId/record")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col p-8 mx-auto">
			<h1 className="text-5xl font-extrabold">Record</h1>
		</div>
	);
}
