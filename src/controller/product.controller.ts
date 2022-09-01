import { Request, Response } from "express";
import { CreateProductInput, UpdateProductInput, GetProductInput, DeleteProductInput } from "../schemas/product.schema";
import { createProduct, deleteProduct, findAndUpdateProduct, findProduct } from "../service/product.service";


export const createProductHandler = async (req: Request<{}, {}, CreateProductInput['body']>, res: Response) => {
	try {
		const userId = res.locals.user._id;
		const body = req.body;
		const product = await createProduct({ ...body, user: userId });

		return res.send(product);
	} catch (e: any) {
		return res.status(409).send(e.message);
	}
}

export const updateProductHandler = async (req: Request<UpdateProductInput['params']>, res: Response) => {
	try {
		const userId = res.locals.user._id;
		const productId = req.params.productId;
		const update = req.body;

		const product = await findProduct({productId})

		if (!product) {
			return res.sendStatus(404)
		}

		if (product.user !== userId) {
			return res.sendStatus(403);
		}

		const updatedProduct = await findAndUpdateProduct({ productId }, update, { new: true });

		return res.send(updatedProduct);
	} catch (e: any) {
		return res.status(409).send(e.message);
	}
}

export const getProductHandler = async (req: Request<GetProductInput['params']>, res: Response) => {
	try {
		const productId = req.params.productId;

		const product = await findProduct({productId})

		if (!product) {
			return res.sendStatus(404)
		}

		return res.send(product);
	} catch (e: any) {
		return res.status(409).send(e.message);
	}
}

export const deleteProductHandler = async (req: Request<DeleteProductInput['params']>, res: Response) => {
	try {
		const userId = res.locals.user._id;
		const productId = req.params.productId;

		const product = await findProduct({productId})

		if (!product) {
			return res.sendStatus(404)
		}

		if (product.user !== userId) {
			return res.sendStatus(403);
		}

		await deleteProduct({ productId });

		return res.sendStatus(200);
	} catch (e: any) {
		return res.status(409).send(e.message);
	}
}
