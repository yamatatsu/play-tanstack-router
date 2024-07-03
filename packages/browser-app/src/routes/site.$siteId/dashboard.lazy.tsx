import { createLazyFileRoute } from "@tanstack/react-router";
import { Card, Table } from "react-daisyui";

export const Route = createLazyFileRoute("/site/$siteId/dashboard")({
	component: Component,
});

function Component() {
	return (
		<div className="flex flex-col w-full p-8 gap-y-12">
			<div className="flex w-full gap-x-3">
				<Card bordered className="w-1/3">
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card bordered className="w-1/3">
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card bordered className="w-1/3">
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
			</div>
			<div className="overflow-x-auto">
				<Table className="table">
					<Table.Head>
						<span>Name</span>
						<span>State</span>
						<span>Updated At</span>
					</Table.Head>
					<Table.Body>
						<Table.Row>
							<span>Point A-1</span>
							<span>OK</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
						<Table.Row>
							<span>Point A-2</span>
							<span>OK</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
						<Table.Row>
							<span>Point B-1</span>
							<span>OK</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
						<Table.Row className="bg-warning">
							<span>Point B-2</span>
							<span>NG</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
						<Table.Row>
							<span>Point C-1</span>
							<span>OK</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
						<Table.Row>
							<span>Point C-2</span>
							<span>OK</span>
							<span>2024-07-02 21:24</span>
						</Table.Row>
					</Table.Body>
				</Table>
			</div>
			<div className="flex w-full gap-x-3">
				<Card bordered className="w-1/2">
					<div className="card-body">
						<div className="card-title">title</div>
						<div>status</div>
						<div>metrics</div>
					</div>
				</Card>
				<Card bordered className="w-1/2">
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
