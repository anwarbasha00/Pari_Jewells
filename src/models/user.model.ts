import mongoose , {model, Schema} from "mongoose";

interface Iuser{
    name:string,
    email:string,
    password:string,
    image?:string,
    createdAt?:Date,
    updatedAt?:Date,
    _id:mongoose.Types.ObjectId
}

const userSchema = new mongoose.Schema<Iuser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:false
    }
},
{timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User",userSchema)

export default User