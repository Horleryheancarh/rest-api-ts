import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import config from 'config'

import Session, { SessionDocument } from "../models/session.model";
import { sign, verify } from "../utils/jwt.utils";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
	const session = await Session.create({ user: userId, userAgent });

	return session.toJSON();
}

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
	return Session.find(query).lean();
}

export const updateSession = async (query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) => {
	return Session.updateOne(query, update);
}

export const reIssueAccessToken = async (refreshToken: string) => {
	const { decoded } = await verify(refreshToken);
	if (!decoded || !get(decoded, 'session')) { return false; }

	const session = await Session.findById(get(decoded, 'session'))
	if (!session || !session.valid) { return false; }

	const user = await findUser({_id: session.user});
	if (!user) { return false; }

	// create new access token
	const accessToken = sign({ ...user, session: session._id }, { expiresIn: config.get("accessTokenTTL") });
	return accessToken;
}