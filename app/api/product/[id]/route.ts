import { getCurrentUser } from "@/actions/getCurrentUser";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";


export async function DELETE(request: Request, { params }: {params: { id: string }}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (currentUser?.user?.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const product = await Product.findByIdAndDelete({_id: params.id});

    return NextResponse.json(product);
}