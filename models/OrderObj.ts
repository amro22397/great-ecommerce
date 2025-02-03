import { model, models, Schema } from "mongoose";

const OrderObjSchema = new Schema({
    userId: {
        type: String,
    },

    user: {
        type: Object,
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
    },

    createDate: {
        type: Date,
        default: Date.now,
    }


    
}, { timestamps: true }
)

export const OrderObj = models?.OrderObj || model('OrderObj', OrderObjSchema);