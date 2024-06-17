import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";

export const Route = createLazyFileRoute("/login")({
	component: Component,
});

function Component() {
	return (
		<div className="container py-20 flex justify-center">
			<Card className="p-12 w-fit items-center flex flex-col">
				<Link to="/">
					<Button>Login</Button>
				</Link>
			</Card>
		</div>
	);
}
