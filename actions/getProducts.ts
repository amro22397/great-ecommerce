import { Product } from "@/models/Product";
import mongoose from "mongoose";

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}

  export default async function getProducts(params: IProductParams) {
    
    try {

        mongoose.connect(process.env.DATABASE_URL as string);

        const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }
        const products = await Product.find({
            ...query,
            $or: [
                {name: {$regex: searchString, $options: "i"}},
                {description: {$regex: searchString, $options: "i"}}
            ]
        }).sort({createdAt: -1})

        const jProducts = JSON.parse(JSON.stringify(products));

        console.log(jProducts)

        return jProducts;
    } catch (error) {
        console.log(error)
    }
  }