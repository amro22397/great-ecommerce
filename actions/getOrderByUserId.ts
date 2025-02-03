import { OrderObj } from "@/models/OrderObj"

export default async function getOrdersByUserId(id: string){
    try {
        const orders = await OrderObj.find(
            { userId: { $in: [id] } },
        ).sort({ createdAt: -1 })

        const jOrders = JSON.parse(JSON.stringify(orders));

        return jOrders
    } catch (error: any) {
        throw new Error(error)
    }
}