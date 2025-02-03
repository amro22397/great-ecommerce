
import { getCurrentUser } from '@/actions/getCurrentUser';
import { Product } from '@/models/Product';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    mongoose.connect(process.env.DATABASE_URL as string);

    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser?.user?.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const body = await request.json();
    const { name, description, price, brand, category, inStock, images } = body;

    const product = await Product.create({ name,
        description,
        brand,
        category,
        inStock,
        images,
        price: parseFloat(price), });

    return NextResponse.json(product);
}

export async function PUT(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) return NextResponse.error();

    if (currentUser?.user?.role !== 'ADMIN') {
        return NextResponse.error();
    }

    const body = await request.json();
    const { id, inStock } = body;

    const product = await Product.findByIdAndUpdate({_id: id}, { inStock } )

    return NextResponse.json(product);

}