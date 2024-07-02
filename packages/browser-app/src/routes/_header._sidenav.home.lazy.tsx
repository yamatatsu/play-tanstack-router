import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import useAuthSession from "@/components/useAuthSession.ts";
import useAuthUser from "@/components/useAuthUser.ts";

export const Route = createLazyFileRoute("/_header/_sidenav/home")({
	component: Index,
});

function Index() {
	const [count, setCount] = useState(0);
	const session = useAuthSession();
	const user = useAuthUser();

	return (
		<div className="container flex flex-col py-8 mx-auto space-y-8">
			<h1 className="text-5xl font-extrabold">Vite + React</h1>
			<div className="shadow-xl card bg-neutral-content w-96">
				<div className="card-body">
					<Button onClick={() => setCount((count) => count + 1)}>
						count is {count}
					</Button>
				</div>
			</div>
			<p>{user?.username}</p>
			<p>{session?.tokens?.idToken?.toString()}</p>
		</div>
	);
}
