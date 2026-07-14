import { NextAuthOptions  } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import Email from "next-auth/providers/email"
import User from "../models/user.model"
import bcrypt from "bcryptjs"
import { connectDB } from "./connectdb"
import Google from "next-auth/providers/google"

const authOptions:NextAuthOptions = {

    providers:[

        CredentialsProvider({
            name:"Credentials",
            credentials:{
                email:{label:"email",type:"text"},
                password:{label:"password",type:"password"}
            },
            async authorize(credentials,req){

                let email = credentials?.email
                let password = credentials?.password

                if(!email || !password){
                    throw new Error("email or password in invalid!...")
                }

                await connectDB()

                let user = await User.findOne({email})
                if(!user){
                    throw new Error("No user found with this email!...")
                }

                let isPasswordvalid = await bcrypt.compare(password,user.password)
                if(!isPasswordvalid){
                    throw new Error("Invalid Password!...")
                }
                
                return{
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image
                }

            },
        }) ,
        
        Google({
            clientId:process.env.GOOGLE_CLIENT_ID!,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET!
        })

    ],
    callbacks:{

        async signIn({account,user}){
            if(account?.provider=="google"){
                await connectDB()

                let isExistUser = await User.findOne({email:user?.email})
                
                if(!isExistUser){
                   let isExistUser = await User.create({
                    name:user?.name,
                    email:user?.email,
                   })
                }
                user.id = isExistUser?._id as string
            }
            return true
        },

        async jwt({token,user}) {
            if(user){
                token.id=user.id
                token.name=user.name
                token.email=user.email
                token.image=user.image
            }
            return token
        },

        async session({session,token}){
            if(session.user){
                session.user.id=token.id as string
                session.user.name=token.name as string
                session.user.email=token.email as string
                session.user.image=token.image as string
            }
            return session
        }
    },
    session:{
        strategy:"jwt",
        maxAge:7*24*60*60,
    },
    pages:{
        signIn:'/login',
        error:'/login'
    },
    secret:process.env.NEXTAUTH_SECRET
}

export default authOptions