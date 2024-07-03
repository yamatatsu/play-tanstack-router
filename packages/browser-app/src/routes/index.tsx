import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "react-daisyui";

import { test_siteId } from "@/constants";

export const Route = createFileRoute("/")({
	component: () => {
		return (
			<div className="container p-8 w-80">
				<Link to={`/site/${test_siteId}/dashboard`}>
					<Button>Test Site</Button>
				</Link>
			</div>
		);
	},
});
