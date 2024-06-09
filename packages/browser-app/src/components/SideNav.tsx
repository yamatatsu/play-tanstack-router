import { Button } from "@/components/ui/button";

export default function SideNav() {
	return (
		<nav className="flex flex-col space-y-2 p-4 border-r-2 h-screen">
			<NavItem href="/menu1" label="menu1" />
			<NavItem href="/menu2" label="menu2" />
			<NavItem href="/menu3" label="menu3" />
			<NavItem href="/menu4" label="menu4" />
		</nav>
	);
}

function NavItem(props: { label: string; href: string }) {
	return <Button variant="ghost">{props.label}</Button>;
}
