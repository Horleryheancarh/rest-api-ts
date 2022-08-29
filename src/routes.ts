import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, getUserSessionsHandler } from "./controller/session.controller";
import validateRequest from "./middlewares/validateRequest";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";
import requireUser from "./middlewares/requireUser";

export default (app: Express) => {
	app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

	// User
	app.post("/api/user", validateRequest(createUserSchema), createUserHandler)
	// Sessions
	app.post("/api/session", validateRequest(createSessionSchema), createUserSessionHandler);
	app.get("/api/sessions", requireUser, getUserSessionsHandler);
}