import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/menu/$menuId")({
	component: Menu,
});

function Menu() {
	const { menuId } = Route.useParams();
	return <div className="p-2">Menu{menuId}!</div>;
}
