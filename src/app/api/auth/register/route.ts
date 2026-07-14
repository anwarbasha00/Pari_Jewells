import { connectDB } from "@/src/lib/connectdb";
import User from "@/src/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    try {
        const {name,email,password} = await request.json()

        await connectDB()

        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return NextResponse.json({
                message:"User already exist with this email!....",
                status:400
            })
        }

        if(password.length<6){
            return NextResponse.json({
              message:"Password must be greater than six characters!....",
                status:400  
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,email,password:hashedPassword
        })

        return NextResponse.json(
            {
                message:"User registered sucessfull!...",
                status:201
            }
        )

    } catch (error) {
        return NextResponse.json({
            message:`Server error while registering user : ${error}`,
            status:500
        })
    }
}