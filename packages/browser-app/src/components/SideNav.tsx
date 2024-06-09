import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export default function SideNav() {
	return (
		<nav className="flex flex-col space-y-2 p-4 border-r-2 h-screen">
			<NavItem to="/menu1" label="menu1" />
			<NavItem to="/menu2" label="menu2" />
			<NavItem to="/menu3" label="menu3" />
			<NavItem to="/about" label="about" />
		</nav>
	);
}

function NavItem(props: { label: string; to: string }) {
	return (
		<Link to={props.to}>
			<Button variant="ghost">{props.label}</Button>
		</Link>
	);
}
