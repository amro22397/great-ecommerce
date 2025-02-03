import { User } from "@/models/User";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { SafeUser } from "@/types";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";


export async function getSession() {
    return await getServerSession(authOptions);
}

export async function getCurrentUser(): Promise<any> {
    try {
        let session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        mongoose.connect(process.env.DATABASE_URL as string);
        const currentUser = await User.findOne({
            email: session?.user?.email,
            orders: { $exists: true }
        }
        )

        if (!currentUser) {
            const user = await User.create({
                name: session?.user.name,
                email: session?.user?.email,
                image: session?.user?.image,
              })
              session.user = user;

              const jSession = JSON.parse(JSON.stringify(session));

              return jSession;
        } else {
            session.user = currentUser;

            const jSession = JSON.parse(JSON.stringify(session));

            return jSession;
        }

        
    } catch (error: any) {
        console.log(error)
    }
}