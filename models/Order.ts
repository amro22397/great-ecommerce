import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({

    userId: {
        type: String,
    },

    amount: {
        type: Number,
    },

    currency: {
        type: String,
    },

    status: {
        type: String,
    },

    deliveryStatus: {
        type: String,
    },

    products: {
        type: Array,
    }

}, {timestamps: true})

export const Order = models?.Order || model('Order', OrderSchema)