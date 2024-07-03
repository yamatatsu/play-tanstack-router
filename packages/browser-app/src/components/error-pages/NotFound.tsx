import { Link } from "@tanstack/react-router";
import { Button } from "react-daisyui";

import "@/globals.css";
import { test_siteId } from "@/constants";

export default function NotFound() {
	return (
		<div className="flex flex-col p-8 gap-y-4">
			<h1 className="text-5xl font-extrabold">Not found!</h1>
			<Link to={`/site/${test_siteId}/dashboard`}>
				<Button color="secondary">Go home</Button>
			</Link>
		</div>
	);
}
