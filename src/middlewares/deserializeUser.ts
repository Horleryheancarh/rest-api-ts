import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt.utils";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

	const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")

	if (!accessToken) return next();

	const { decoded, expired } = await verify(accessToken);

	if (decoded) {
		res.locals.user = decoded;
		return next();
	}
}

export default deserializeUser