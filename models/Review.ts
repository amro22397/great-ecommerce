import mongoose, { model, models, Schema } from "mongoose";


const ReviewSchema = new Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId, ref: "id"
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "userId"
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId, ref: "productId"
    },

    rating: {
        type: Number,
    },

    comment: {
        type: String,
    },

    createdDate: {
        type: Date,
        default: Date.now,
    },

    user: {
        type: Object,
    }
    
    
}, { timestamps: true }
)

export const Review = models?.Review || model('Review', ReviewSchema)