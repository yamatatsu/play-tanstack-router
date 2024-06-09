import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";

export const Route = createLazyFileRoute("/")({
	component: Index,
});

function Index() {
	const [count, setCount] = useState(0);

	return (
		<div className="container py-8 flex flex-col space-y-8">
			<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
				Vite + React
			</h1>
			<Card className="p-12 items-center  flex flex-col space-y-3">
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
