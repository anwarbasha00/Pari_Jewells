'use client'
import { SessionProvider} from "next-auth/react"
import React, { ReactNode } from 'react'
import CartSync from "./src/app/components/CartSync"
const ClientProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <SessionProvider>
    <CartSync />

    {children}
</SessionProvider>
  )
}

export default ClientProvider
