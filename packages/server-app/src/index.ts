import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(
	cors({
		origin: process.env.CORS_ORIGIN,
	}),
);

app.get("/", (_req, res) => {
	res.json({ message: "Hello World!" });
});

app.get("/plc-data-latest", async (_req, res) => {
	const plcData = await prisma.plcData.findMany({
		distinct: ["dataName"],
		where: { timestamp: { gt: new Date(Date.now() - 10_000) } },
		orderBy: { timestamp: "desc" },
	});

	res.json({ plcData: plcData });
});

app.listen(port, () => {
	console.log(`Express App listening http://localhost:${port}`);
});
