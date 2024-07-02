import { Link } from "@tanstack/react-router";

import "@/globals.css";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="flex flex-col p-8 gap-y-4">
			<h1 className="text-5xl font-extrabold">Not found!</h1>
			<Link to="/">
				<Button variant="secondary">Go home</Button>
			</Link>
		</div>
	);
}
