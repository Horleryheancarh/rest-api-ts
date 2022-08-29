import mongoose from "mongoose";
import { compare, genSalt, hashSync } from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
	email: string;
	name: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
		email: { type: String, required: true, unique: true },
		name: { type: String, required: true },
		password: { type: String, required: true }
	},
	{ timestamps: true	});

// 
userSchema.pre("save", async (next) => {
	let user = this as unknown as UserDocument;

	// Hash if password is new or modified
	if (!user.isModified("password")) return next();

	// Random additional data
	const salt = await genSalt(config.get("saltWorkFactor"));

	const hash = hashSync(user.password, salt);

	// Set the password to the hash
	user.password = hash;

	return next();
});

// Compare Password
userSchema.methods.comparePassword = async (candidatePassword: string) =>{
	const user = this as unknown as UserDocument;

	return compare(candidatePassword, user.password).catch((e) => false);
}

const User = mongoose.model<UserDocument>("User", userSchema)

export default User;