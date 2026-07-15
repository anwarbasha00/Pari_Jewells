'use client'
import { Suspense } from "react";
import axios from 'axios'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Button from '../components/Button'
import Image from 'next/image'
import logo from '../public/images/pari_logo.jpeg'
import { useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const session = useSession()
  const searchParams = useSearchParams();

const callbackUrl =
  searchParams.get("callbackUrl") || "/";
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      alert(result.error);
      return;
    }

    if (result?.ok) {
      router.push(callbackUrl);
      router.refresh();
    }
  } catch (error) {
    console.log(error);
  }
};

  const handleLoginGoogle = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  await signIn("google", {
    callbackUrl,
  });
};

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
          Welcome Back
          <br />
          Timeless Elegance Awaits
        </h2>

        {/* Subtitle */}
        <p className="mt-6 max-w-lg text-lg leading-8 text-muted">
          Sign in to access your account, explore our latest jewellery collections, track your orders, and continue your shopping journey with Pari.
        </p>

        
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full justify-center lg:w-1/2 m-2">

        <div className="w-full max-w-md  rounded-3xl bg-white p-10 shadow-2xl max-h-[50%]">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-foreground">
              Sign In
            </h2>

            <p className="mt-2 text-muted">
            Welcome back! Sign in to continue your Pari experience.         </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-full rounded-xl border border-border px-5 bg-white"
            />

            <div className="relative">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="h-10 w-full rounded-xl border border-border bg-white px-5 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-[#E02C69] transition-colors"
  >
    {showPassword ? (
      <EyeOff size={20} />
    ) : (
      <Eye size={20} />
    )}
  </button>
</div>

            <Button
                type="submit"
                className="w-full"
            >
                Sign In
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
            Don't have an account?{""}
            <span
              onClick={() => router.push("/register")}
              className="cursor-pointer font-semibold text-primary hover:underline"
            >
             Create Account
            </span>
          </p>

        </div>

      </div>

    </div>
  </div>
);
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
