import Container from "@/components/Container";
import OrderDetails from "./OrderDetails";
import getOrderById from "@/actions/getOrderById";
import { getCurrentUser } from "@/actions/getCurrentUser";


interface Iprams {
    orderId?: string;
}

const page = async ({ params }: { params: Iprams }) => {

    const currentUser = await getCurrentUser();
    const order = await getOrderById(params)

  return (
    <div className="p-8 max-md:px-2 md:px-2 lg:px-8">
      <Container>
        <OrderDetails order={order} currentUser={currentUser?.user} />
        
      </Container>
    </div>
  )
}

export default page
