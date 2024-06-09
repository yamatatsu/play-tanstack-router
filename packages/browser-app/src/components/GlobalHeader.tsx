import { AcademicCapIcon } from "@heroicons/react/24/solid";

export default function GlobalHeader() {
	return (
		<header className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md">
			<div className="items-center px-4 py-2">
				<a href="/">
					<div className="flex space-x-3 items-center">
						<AcademicCapIcon className="size-10" />
						<div>
							<p className="font-extrabold text-3xl">Tailwind Training</p>
						</div>
					</div>
				</a>
			</div>
		</header>
	);
}
