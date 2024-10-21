import compression from "compression";
import helmet from "helmet";

import express from "express";
import env from "dotenv";

env.config();
const app = express();

app.use(helmet()); // Secure app by setting various HTTP headers
app.use(compression());
const port = process.env.EXTRA_PORT ?? 3001;

app.get("/status", async (req, res) => {
    res.status(200).send({ message: process?.env?.EXTRA_MESSAGE });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
