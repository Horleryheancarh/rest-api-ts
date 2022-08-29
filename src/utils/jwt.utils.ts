import jwt from "jsonwebtoken";
import config from "config";
import log from "./logger";

const privateKey = config.get("privateKey") as string;
const publicKey = config.get("publicKey") as string;

export const sign = async (object: Object, options?: jwt.SignOptions | undefined ) => {
	return jwt.sign(object, privateKey, { 
		...options,
		algorithm: "RS256"
	});
}

export const verify = async (token: string) => {
	try {
		const decoded = jwt.verify(token, publicKey);
		return {
			valid: true,
			expired: false,
			decoded
		}
	} catch (e: any) {
		log.error(e);
		return {
			valid: false,
			expired: e.message === "jwt expired",
			decoded: null
		}
	}
}