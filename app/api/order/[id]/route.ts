import { getCurrentUser } from "@/actions/getCurrentUser";
import { OrderObj } from "@/models/OrderObj";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string }}) {

    mongoose.connect(process.env.DATABASE_URL as string);

    const currentUser = await getCurrentUser();
    
    if (!currentUser) return NextResponse.error();

    const order = await OrderObj.deleteOne({_id: params.id })

    return NextResponse.json(order);

}