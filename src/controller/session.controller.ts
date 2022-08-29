import { Request, Response } from "express";

import { sign } from "../utils/jwt.utils";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
import config from "config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
	try {
		// validate the mail and password
		const user = await validatePassword(req.body);

		if (!user) {
			return res.status(401).send("Invalid username or password");
		}

		// create a sassion
		const session = await createSession(user._id, req.get("user-agent") || "");

		// create access token
		const accessToken = sign({ ...user, session: session._id }, { expiresIn: config.get("accessTokenTTL") });

		// create refresh token
		const refreshToken = sign({ ...user, session: session._id }, { expiresIn: config.get("refreshTokenTTL") });

		// send refresh and access token back
		return res.send({accessToken, refreshToken})
	} catch(e: any){
		return res.status(409).send(e.message);
	}
}

export const getUserSessionsHandler =async (req: Request, res: Response) => {
	const userId = res.locals.user._id;

	const sessions = await findSessions({user: userId, valid: true});

	return res.send(sessions);
}

export const deleteSessionHandler = async (req: Request, res: Response ) => {
	const sessionId = res.locals.user.session;

	await updateSession({_id: sessionId}, {valid: false})

	return res.send({
		accessToken: null,
		refreshToken: null
	})
}