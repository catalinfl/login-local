import mongoose from 'mongoose'

export type UserSchemaType = {
    fname: string,
    lname: string,
    email: string,
    password: string
}

const UserSchema = new mongoose.Schema<UserSchemaType>({
    fname: String,
    lname: String,
    email: String,
    password: String
}, 
{
    collection: "UserInfo"
})

export const User = mongoose.model("UserInfo", UserSchema)
