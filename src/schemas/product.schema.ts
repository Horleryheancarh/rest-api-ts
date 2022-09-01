import { object, string, number, TypeOf } from 'yup';

const payload = {
	body: object({
		title: string().required("Title is required"),
		description: string()
			.required("Description is required")
			.min(120, "Description should be at least 120 characters long"),
		price: number().required("Price is required"),
		image: string().required("Image is required")
	})
}

const params = {
	params: object({
		productId: string().required("Prouct Id is required")
	})
}

export const createProductSchema = object({
	...payload
});

export const updateProductSchema = object({
	...payload,
	...params
});

export const deleteProductSchema = object({
	...params
});

export const getProductSchema = object({
	...params
});

export type CreateProductInput = TypeOf<typeof createProductSchema>
export type UpdateProductInput = TypeOf<typeof updateProductSchema>
export type GetProductInput = TypeOf<typeof getProductSchema>
export type DeleteProductInput = TypeOf<typeof deleteProductSchema>