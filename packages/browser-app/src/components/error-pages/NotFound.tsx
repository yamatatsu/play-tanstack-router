import { Link } from "@tanstack/react-router";

import "@/globals.css";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="p-8 flex flex-col gap-y-4">
			<h1 className="text-5xl font-extrabold">Not found!</h1>
			<Link to="/">
				<Button variant="outline">Go home</Button>
			</Link>
		</div>
	);
}
