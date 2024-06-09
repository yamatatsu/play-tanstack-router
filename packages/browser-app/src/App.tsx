import GlobalHeader from "@/components/GlobalHeader.tsx";
import SideNav from "@/components/SideNav.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<GlobalHeader />
			<div className="flex flex-row">
				<div>
					<SideNav />
				</div>
				<div className="container py-8 flex flex-col space-y-8">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Vite + React
					</h1>
					<Card className="p-12 items-center  flex flex-col space-y-3">
						<Button onClick={() => setCount((count) => count + 1)}>
							count is {count}
						</Button>
						<p>
							Edit <code>src/App.tsx</code> and save to test HMR
						</p>
					</Card>
					<p>Click on the Vite and React logos to learn more</p>
				</div>
			</div>
		</>
	);
}

export default App;
