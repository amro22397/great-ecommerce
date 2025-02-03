import { getCurrentUser } from "@/actions/getCurrentUser";
import { Product } from "@/models/Product";
import { Review } from "@/models/Review";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {

    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const review = await Review.findById({ _id: params.id });

    console.log(review)

    const { productId, ...data } = review;

    const productReview = await Product.updateOne({ _id: productId }, {
        $pull: {reviews: review}
    })

    return NextResponse.json(productReview);
}