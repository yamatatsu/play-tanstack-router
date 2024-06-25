import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button.tsx";

export default function SideNav() {
	return (
		<nav className="flex flex-col h-screen p-4 space-y-2 border-r-2">
			<NavItem to="/home" label="Home" />
			<NavItem to="/menu/1" label="Menu1" />
			<NavItem to="/menu/2" label="Menu2" />
			<NavItem to="/menu/3" label="Menu3" />
			<NavItem to="/about" label="About" />
		</nav>
	);
}

function NavItem(props: { label: string; to: string }) {
	return (
		<Link to={props.to}>
			{({ isActive }) => (
				<Button variant={isActive ? "default" : "ghost"}>{props.label}</Button>
			)}
		</Link>
	);
}
