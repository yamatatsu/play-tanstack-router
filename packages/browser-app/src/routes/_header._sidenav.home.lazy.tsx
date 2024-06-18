import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";

export const Route = createLazyFileRoute("/_header/_sidenav/home")({
	component: Index,
});

function Index() {
	const [count, setCount] = useState(0);

	return (
		<div className="container py-8 flex flex-col space-y-8">
			<h1 className="text-5xl font-extrabold">Vite + React</h1>
			<Card className="p-12 flex flex-col items-center space-y-3">
				<Button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</Card>
			<p>Click on the Vite and React logos to learn more</p>
		</div>
	);
}
