import { object, string } from "yup";

export const createSessionSchema = object({
	body: object({
		password: string()
			.required("Password is required"),
		email: string()
			.required("Email is required"),
	})
});