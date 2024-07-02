import { createLazyFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button.tsx";

export const Route = createLazyFileRoute("/site/$siteId/dashboard")({
	component: Index,
});

function Index() {
	return (
		<div className="flex flex-col w-full p-8 gap-y-12">
			<div className="flex w-full gap-x-3">
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
			</div>
			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>Name</th>
							<th>State</th>
							<th>Updated At</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Point A-1</td>
							<td>OK</td>
							<td>2024-07-02 21:24</td>
						</tr>
						<tr>
							<td>Point A-2</td>
							<td>OK</td>
							<td>2024-07-02 21:24</td>
						</tr>
						<tr>
							<td>Point B-1</td>
							<td>OK</td>
							<td>2024-07-02 21:24</td>
						</tr>
						<tr className="bg-warning">
							<td>Point B-2</td>
							<td>NG</td>
							<td>2024-07-02 21:24</td>
						</tr>
						<tr>
							<td>Point C-1</td>
							<td>OK</td>
							<td>2024-07-02 21:24</td>
						</tr>
						<tr>
							<td>Point C-2</td>
							<td>OK</td>
							<td>2024-07-02 21:24</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div className="flex w-full gap-x-3">
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card onClick={() => ({})}>
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
			</div>
		</div>
	);
}

type CardProps = {
	onClick: () => void;
	children: React.ReactNode;
};
function Card({ onClick, children }: CardProps) {
	return (
		<button type="button" onClick={onClick}>
			<div className="shadow-sm card-bordered card border-1 w-80">
				{children}
			</div>
		</button>
	);
}
