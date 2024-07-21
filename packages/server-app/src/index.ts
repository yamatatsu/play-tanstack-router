import { type PlcData, PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/plc-data-latest", async (_req, res) => {
	const plcDataList = await prisma.plcData.findMany({
		where: { timestamp: { gt: new Date(Date.now() - 10_000) } },
		orderBy: { timestamp: "desc" },
	});

	const uniqueList = plcDataList.reduce<PlcData[]>((acc, data) => {
		if (acc.every((d) => d.dataName !== data.dataName)) {
			acc.push(data);
		}
		return acc;
	}, []);

	res.json({ plcData: uniqueList });
});

app.listen(port, () => {
	console.log(`Express App listening http://localhost:${port}`);
});
