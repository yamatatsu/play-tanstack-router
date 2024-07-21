import { setTimeout } from "node:timers/promises";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

process.on("SIGINT", () => {
	console.info("Closing prisma connection...");

	prisma
		.$disconnect()
		.then(() => {
			console.info("prisma connection closed.");
		})
		.catch((e) => {
			console.error(e);
		})
		.finally(() => {
			process.exit();
		});
});

async function main() {
	while (true) {
		const now = new Date();
		console.info(`Inserting data at ${now.toISOString()}`);

		await Promise.all([
			setTimeout(5_000),
			prisma.plcData.createMany({
				data: [
					{
						timestamp: now,
						dataName: "plc1",
						value: Math.random(),
					},
					{
						timestamp: now,
						dataName: "plc2",
						value: Math.random() + 2,
					},
				],
			}),
		]);
	}
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
