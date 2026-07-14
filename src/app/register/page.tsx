'use client'

import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Button from '../components/Button'
import Image from 'next/image'
import logo from '../public/images/pari_logo.jpeg'
const page = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const result = await axios.post('/api/auth/register',{name,email,password})
        router.push('/login')
        console.log(result)

    } catch (error) {
        console.log(error)
    }
  }

  const session = useSession()

  const handleLoginGoogle =async (e:React.FormEvent)=>{
      e.preventDefault()
      const result = await signIn("google")
      if(result?.ok){
        alert(`user registred successfully`)
      }
    }

  return (
  <div className="min-h-screen bg-[#FFE2E4]">
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 lg:px-12">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center pr-16 heght-[400px]">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image 
            src={logo}
            alt='pari logo'
            width={300}
            height={150}
          />
        </div>

        {/* Heading */}
        <h2 className="text-4xl font-bold text-foreground leading-tight">
          Timeless Jewellery
          <br />
          Crafted with Elegance
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
          Join Pari and discover handcrafted jewellery designed for every
          occasion. Every piece reflects elegance, craftsmanship, and timeless
          beauty.
        </p>

        
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full justify-center lg:w-1/2 m-2">

        <div className="w-full max-w-md    bg-white p-10 shadow-2xl rounded-3xl max-h-[50%]">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-foreground">
              Create Account
            </h2>

            <p className="mt-2 text-muted">
              Create your Pari account to continue.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 "
          >

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-10 w-full rounded-xl border border-border px-5 bg-white"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-xl border border-border px-5 bg-white"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-10 w-full rounded-xl border border-border px-5 bg-white"
            />

            <Button className="w-full"
             onClick={handleSubmit}
            >
              Join Pari
            </Button>

          </form>

          <div className="my-8 flex items-center gap-4">

            <div className="h-px flex-1 bg-border" />

            <span className="text-sm text-muted">
              ──────── OR ────────
            </span>

            <div className="h-px flex-1 bg-border" />

          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleLoginGoogle}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </Button>

          <p className="mt-6 text-center text-muted">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
              Sign In
            </span>
          </p>

        </div>

      </div>

    </div>
  </div>
);
}

export default page
