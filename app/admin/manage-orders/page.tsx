import Container from '@/components/Container'
import NullData from '@/components/NullData'
import React from 'react'
import ManageOrdersClient from './ManageOrdersClient'
import getOrders from '@/actions/getOrders'
import { getCurrentUser } from '@/actions/getCurrentUser'

const page = async () => {
    const orders = await getOrders()
    const currentUser = await getCurrentUser()

    if (!currentUser || currentUser?.user?.role !== "ADMIN") {
        return (
            <>
            <pre className="hidden">{JSON.stringify(currentUser, null, 2)}</pre>
            <NullData title="You are not allowed to access this page" />
            </>
        );
      }

  return (
    <div className="pt-8">
    <Container>
      <ManageOrdersClient orders={orders}/>
    </Container>
  </div>
  )
}

export default page 

