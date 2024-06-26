import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import useAuthSession from "@/components/useAuthSession";
import useAuthUser from "@/components/useAuthUser";

export const Route = createLazyFileRoute("/_header/_sidenav/home")({
	component: Index,
});

function Index() {
	const [count, setCount] = useState(0);
	const session = useAuthSession();
	const user = useAuthUser();

	return (
		<div className="container flex flex-col py-8 space-y-8">
			<h1 className="text-5xl font-extrabold">Vite + React</h1>
			<Card className="flex flex-col items-center p-12 space-y-3">
				<Button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</Button>
				<p>
					Edit <code>src/App.tsx</code>
				</p>
			</Card>
			<p>{user?.username}</p>
			<p>{session?.tokens?.idToken?.toString()}</p>
		</div>
	);
}
