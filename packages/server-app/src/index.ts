import express from "express";
import { keyword } from "./module.ts";

console.log({ keyword });

const app = express();
const port = 3000;

app.get("/", (_req, res) => {
	res.json({ message: "Hello World!" });
});

app.listen(port, () => {
	console.log(`Express App listening http://localhost:${port}`);
});
