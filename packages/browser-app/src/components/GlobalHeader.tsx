import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { signOut } from "aws-amplify/auth";

import { Button } from "@/components/ui/button.tsx";

export default function GlobalHeader() {
	return (
		<nav className="sticky top-0 w-full shadow-sm bg-base-100 navbar bg-opacity-80 backdrop-blur">
			<div className="flex-1">
				<Link to="/">
					<div className="flex items-center space-x-3">
						<AcademicCapIcon className="size-10" />
						<div>
							<p className="text-3xl font-extrabold">Tailwind Training</p>
						</div>
					</div>
				</Link>
			</div>
			<div className="flex-none">
				<ul className="px-1 menu menu-horizontal">
					<li>
						<details>
							<summary>Menu</summary>
							<ul className="p-2 rounded-t-none bg-base-100">
								<li>
									<a
										href="http://localhost:3000/"
										target="_blank"
										rel="noreferrer"
									>
										Grafana
									</a>
								</li>
								<li className="mt-2">
									<Button
										size="sm"
										onClick={() => {
											signOut();
										}}
									>
										Logout
									</Button>
								</li>
							</ul>
						</details>
					</li>
				</ul>
			</div>
		</nav>
	);
}
