import { useQuery } from "@tanstack/react-query";
import { Link, createLazyFileRoute } from "@tanstack/react-router";
import { Card, Table } from "react-daisyui";

type PlcData = {
	timestamp: string;
	dataName: string;
	value: number;
};

export const Route = createLazyFileRoute("/site/$siteId/dashboard/")({
	component: Component,
});

function Component() {
	const { siteId } = Route.useParams();
	return (
		<div className="flex flex-col w-full p-8 gap-y-12">
			<div className="flex w-full gap-x-3">
				<Link
					to={`/site/${siteId}/dashboard/equipment-status`}
					className="w-1/3"
				>
					<DataCard dataName="plc1" />
				</Link>

				<Link
					to={`/site/${siteId}/dashboard/equipment-status`}
					className="w-1/3"
				>
					<Card bordered className="hover:bg-base-200 h-60">
						<div className="card-body">
							<div className="card-title">title</div>
							<div>status</div>
							<div>metrics</div>
						</div>
					</Card>
				</Link>
				<Link
					to={`/site/${siteId}/dashboard/equipment-status`}
					className="w-1/3"
				>
					<DataCard dataName="plc2" />
				</Link>
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
				<Link
					to={`/site/${siteId}/dashboard/equipment-status`}
					className="w-1/2"
				>
					<Card bordered className="hover:bg-base-200 h-60">
						<div className="card-body">
							<div className="card-title">title</div>
							<div>status</div>
							<div>metrics</div>
						</div>
					</Card>
				</Link>
				<Link
					to={`/site/${siteId}/dashboard/equipment-status`}
					className="w-1/2"
				>
					<Card bordered className="hover:bg-base-200 h-60">
						<div className="card-body">
							<div className="card-title">title</div>
							<div>status</div>
							<div>metrics</div>
						</div>
					</Card>
				</Link>
			</div>
		</div>
	);
}

function DataCard(props: { dataName: string }) {
	const { dataName } = props;

	const result = useQuery({
		queryKey: ["plc-data-latest"],
		queryFn: async (): Promise<PlcData[]> => {
			const res = await fetch("http://localhost:8000/plc-data-latest");
			const data = await res.json();
			return data.plcData;
		},
		refetchInterval: 5_000,
	});

	if (!result.isSuccess) {
		return (
			<Card bordered className="hover:bg-base-200 h-60">
				<Card.Body>
					<Card.Title>{dataName}</Card.Title>
					<div>time: Loading...</div>
					<div>value: Loading...</div>
				</Card.Body>
			</Card>
		);
	}

	const data = result.data.find((d) => d.dataName === dataName);

	if (!data) {
		return (
			<Card bordered className="hover:bg-base-200 h-60">
				<Card.Body>
					<Card.Title>{dataName}</Card.Title>
					<div>time: No Data</div>
					<div>value: No Data</div>
				</Card.Body>
			</Card>
		);
	}

	return (
		<Card bordered className="hover:bg-base-200 h-60">
			<Card.Body>
				<Card.Title>{dataName}</Card.Title>
				<div>time: {data.timestamp}</div>
				<div>value: {data.value.toFixed(2)}</div>
			</Card.Body>
		</Card>
	);
}
