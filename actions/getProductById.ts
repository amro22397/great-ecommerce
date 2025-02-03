import { Product } from "@/models/Product";
import mongoose from "mongoose";


interface IParams{
    productId?: string
}

  export default async function getProductById(params: IParams) {
    try {

        mongoose.connect(process.env.DATABASE_URL as string);

        const {productId} = params;
        console.log(productId)

        const product = await Product.findOne({_id: productId})

        console.log(product)

        const jProduct = JSON.parse(JSON.stringify(product));

        if (!jProduct) {
            // return null;
        }

        return jProduct;

    } catch (error: any) {
        throw new Error(error)
    }
  }