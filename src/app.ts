const express = require("express");
const config = require("config");
import log from "./logger";
import routes from "./routes";
const connect = require("./db/connect");


const port = config.get("port") as number;
const host = config.get("host") as string;


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setup
connect();
routes(app);


app.listen(port, host, () => {
	log.info(`Server listening on http://${host}:${port}`);
})