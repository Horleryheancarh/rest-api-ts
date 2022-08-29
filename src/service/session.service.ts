import { FilterQuery, UpdateQuery } from "mongoose";
import Session, { SessionDocument } from "../models/session.model";

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