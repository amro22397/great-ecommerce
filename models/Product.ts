import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
    id: {
        type: String,
    },

    name: {
        type: String,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
    },

    brand: {
        type: String,
    },

    category: {
        type: String,
    },

    inStock: {
        type: Boolean,
    },

    images: {
        type: Array,
    },

    reviews: {
        type: Array,
    },

    
    
}, { timestamps: true }
)

export const Product = models?.Product || model('Product', ProductSchema)