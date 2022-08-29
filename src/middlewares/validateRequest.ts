import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";
import log from "../utils/logger"

const validate = (schema: AnySchema) => (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		 schema.validate({
			body: req.body,
			query: req.query,
			params: req.params
		});

		return next();
	} catch (e) {
		log.error(e);
		return res.status(400).send(e);
	}
}

export default validate