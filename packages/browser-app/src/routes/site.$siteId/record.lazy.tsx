import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button.tsx";
import useAuthUser from "@/components/useAuthUser.ts";

export const Route = createLazyFileRoute("/site/$siteId/record")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col h-screen p-8 mx-auto space-y-8">
			<h1 className="text-5xl font-extrabold">Record</h1>
		</div>
	);
}
