import { omit } from "lodash";
import { DocumentDefinition } from "mongoose";
import  User, { UserDocument } from "../models/user.model";

export const createUser = async (input: DocumentDefinition<UserDocument>) => {
	try {
		return await User.create(input);
	} catch (error: any) {
		throw new Error(error);
	}
}

export const findUser = async () => {}

export const validatePassword = async ({
	email,
	password
}: {
	email: UserDocument["email"];
	password: string;
}) => {
	const user = await User.findOne({ email });

	if (!user) { return false; }

	const isValid = await user.comparePassword(password);

	if (!isValid) { return false; }

	return omit(user.toJSON(), "password");
}