import Container from "@/components/Container"
import CartClient from "./CartClient"
import { getCurrentUser } from "@/actions/getCurrentUser"

const page = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div className='p-8 max-md:px-[8px] md:px-2 lg:px-8'>
    <Container >
      <CartClient currentUser={currentUser?.user} />
    </Container>
  </div>
  )
}

export default page
