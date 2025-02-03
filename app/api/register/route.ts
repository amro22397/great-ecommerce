import bcrypt from 'bcrypt'
import mongoose from 'mongoose';
import { User } from '../../../models/User'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    mongoose.connect(process.env.DATABASE_URL as string);

    const body = await request.json();
    const { name, email, password } = body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({ name, email, hashedPassword });

    return NextResponse.json(user);
}