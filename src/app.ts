import express from "express";
import config from "config";

import connect from "./utils/connect";
import log from "./utils/logger";
import routes from "./routes";
import deserializeUser from "./middlewares/deserializeUser";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser)

// Server Setup
routes(app);

app.listen(port, host, async () => {
	log.info(`Server listening on http://${host}:${port}`);

	await connect();
});