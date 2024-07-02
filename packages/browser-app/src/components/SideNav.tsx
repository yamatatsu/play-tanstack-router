import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button.tsx";

type Props = {
	children: ReactNode;
};
export default function SideNav({ children }: Props) {
	return (
		<div className="flex flex-row justify-center w-full gap-6">
			<aside className="w-36">
				<div className="sticky mx-auto top-20">
					<div className="flex flex-col p-4 space-y-2 ">
						<NavItem to="/site/$siteId/dashboard" label="Dashboard" />
						<NavItem to="/site/$siteId/record" label="Record" />
					</div>
				</div>
			</aside>
			<div className="flex-1 w-full">{children}</div>
		</div>
	);
}

function NavItem(props: { label: string; to: LinkProps["to"] }) {
	return (
		<Link to={props.to}>
			{({ isActive }) => (
				<Button variant={isActive ? "secondary" : "ghost"}>
					{props.label}
				</Button>
			)}
		</Link>
	);
}
