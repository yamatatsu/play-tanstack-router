import { type PlcData, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const PLC_DATA_SEEDS = [
	{
		timestamp: new Date("2024-07-01 00:00:00+09:00"),
		dataName: "plc1",
		value: 12.3,
	},
	{
		timestamp: new Date("2024-07-01 00:10:00+09:00"),
		dataName: "plc1",
		value: 12.2,
	},
	{
		timestamp: new Date("2024-07-01 00:20:00+09:00"),
		dataName: "plc1",
		value: 12.1,
	},
	{
		timestamp: new Date("2024-07-01 00:30:00+09:00"),
		dataName: "plc1",
		value: 12.6,
	},
	{
		timestamp: new Date("2024-07-01 00:40:00+09:00"),
		dataName: "plc1",
		value: 12.3,
	},
	{
		timestamp: new Date("2024-07-01 00:50:00+09:00"),
		dataName: "plc1",
		value: 12.5,
	},
	{
		timestamp: new Date("2024-07-01 00:00:00+09:00"),
		dataName: "plc2",
		value: 13.9,
	},
	{
		timestamp: new Date("2024-07-01 00:10:00+09:00"),
		dataName: "plc2",
		value: 13.1,
	},
	{
		timestamp: new Date("2024-07-01 00:20:00+09:00"),
		dataName: "plc2",
		value: 13.2,
	},
	{
		timestamp: new Date("2024-07-01 00:30:00+09:00"),
		dataName: "plc2",
		value: 13.1,
	},
	{
		timestamp: new Date("2024-07-01 00:40:00+09:00"),
		dataName: "plc2",
		value: 13.5,
	},
	{
		timestamp: new Date("2024-07-01 00:50:00+09:00"),
		dataName: "plc2",
		value: 13.2,
	},
] satisfies PlcData[];

async function main() {
	const plcData = await prisma.$transaction(
		PLC_DATA_SEEDS.map((seed) =>
			prisma.plcData.upsert({
				where: {
					timestamp_dataName: {
						timestamp: seed.timestamp,
						dataName: seed.dataName,
					},
				},
				update: seed,
				create: seed,
			}),
		),
	);
	console.log({ plcData });
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
