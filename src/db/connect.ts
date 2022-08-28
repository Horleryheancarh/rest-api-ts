const mongoose = require("mongoose");
const config = require("config");
import log from "../logger";

const connect = () => {
	const dbUri = config.get("dbUri") as string;

	return mongoose
		.connect(dbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() => {
			log.info("Database connected");
		}).catch((err: any) => {
			log.error("db error", err);
			process.exit(1);
		})
}

module.exports = connect;