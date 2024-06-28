import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";
import { signOut } from "aws-amplify/auth";
import { Button } from "./ui/button";

export default function GlobalHeader() {
	return (
		<header className="sticky top-0 flex items-center justify-between shadow-md bg-background/95 backdrop-blur">
			<div className="items-center px-4 py-2">
				<Link to="/">
					<div className="flex items-center space-x-3">
						<AcademicCapIcon className="size-10" />
						<div>
							<p className="text-3xl font-extrabold">Tailwind Training</p>
						</div>
					</div>
				</Link>
			</div>
			<div className="items-center px-4 py-2">
				<Button
					onClick={() => {
						signOut();
					}}
				>
					Logout
				</Button>
			</div>
		</header>
	);
}
