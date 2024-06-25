import { AcademicCapIcon } from "@heroicons/react/24/solid";
import { Link } from "@tanstack/react-router";

export default function GlobalHeader() {
	return (
		<header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
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
		</header>
	);
}
