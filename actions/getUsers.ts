import { User } from "@/models/User";
import mongoose from "mongoose";


export default async function getUsers() {
    try {
        mongoose.connect(process.env.DATABASE_URL as string);
        const users = User.find({})
        const jUsers = JSON.parse(JSON.stringify(users));

        return jUsers

    } catch (error: any) {
        console.log(error)
    }
}