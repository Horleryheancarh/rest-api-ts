import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.controller";
import { createUserSessionHandler, getUserSessionsHandler, deleteUserSessionHandler } from "./controller/session.controller";
import validate from "./middlewares/validateRequest";
import { createUserSchema } from "./schemas/user.schema";
import { createSessionSchema } from "./schemas/session.schema";
import requireUser from "./middlewares/requireUser";
import { createProductSchema, deleteProductSchema, getProductSchema, updateProductSchema } from "./schemas/product.schema";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";


export default (app: Express) => {

	app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

	// User
	app.post("/api/user", validate(createUserSchema), createUserHandler);

	// Sessions
	app.post("/api/session", validate(createSessionSchema), createUserSessionHandler);
	app.get("/api/sessions", requireUser, getUserSessionsHandler);
	app.delete("/api/sessions", requireUser, deleteUserSessionHandler);

	// Products
	app.post("/api/product", [requireUser, validate(createProductSchema)], createProductHandler);
	app.put("/api/product/:productId", [requireUser, validate(updateProductSchema)], updateProductHandler);
	app.get("/api/product/:productId", validate(getProductSchema), getProductHandler);
	app.delete("/api/product/:productId", [requireUser, validate(deleteProductSchema)], deleteProductHandler);
}