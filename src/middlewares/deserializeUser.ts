import { get } from "lodash";
import { Request, Response, NextFunction } from "express";
import { verify } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {

	const accessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/, "")
	const refreshToken = get(req, "headers.x-refresh", "").replace(/^Bearer\s/, "")

	if (!accessToken) return next();

	const { decoded, expired } = await verify(accessToken);

	if (decoded) {
		res.locals.user = decoded;
		return next();
	}
	
	if (expired && refreshToken) {
		const newAccessToken = await reIssueAccessToken(refreshToken);

		if (newAccessToken) {
			res.setHeader('x-access-token', newAccessToken)
		}

		const { decoded } = await verify(newAccessToken);
		res.locals.user = decoded
		
		return next();
	}

	return next();
}

export default deserializeUser