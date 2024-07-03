import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { signOut } from "aws-amplify/auth";
import { Button, Menu, Navbar } from "react-daisyui";

export default function GlobalHeader() {
	return (
		<Navbar className="sticky top-0 w-full shadow-sm bg-base-100 bg-opacity-80 backdrop-blur">
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
				<Menu horizontal className="px-1">
					<Menu.Item>
						<Menu.Details label="Menu">
							<Menu.Item>
								<a
									href="http://localhost:3000/"
									target="_blank"
									rel="noreferrer"
								>
									Grafana
								</a>
							</Menu.Item>
							<Menu.Item className="mt-2">
								<Button
									size="sm"
									onClick={() => {
										signOut();
									}}
								>
									Logout
								</Button>
							</Menu.Item>
						</Menu.Details>
					</Menu.Item>
				</Menu>
			</div>
		</Navbar>
	);
}
