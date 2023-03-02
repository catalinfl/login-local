import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { UserSchemaType } from './models/UserSchema';
import { User } from "./models/UserSchema"
import cors from "cors"
const app = express();

app.use(cors())
app.use(express.json())

const mongoURL = "mongodb+srv://user:user@e-commerce.to4hvbb.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoURL)
        .then(() => {
            console.log("Connect to database")
        })
        .catch((e) => console.log(e))


app.post("/register", async (req: Request, res: Response) => {
    const { fname, lname, email, password } = req.body
    try {
        await User.create<UserSchemaType>({
            fname,
            lname,
            email,
            password,
        })
        res.send({ status: "ok" })
    }
    catch(err) {
        res.send( { status: "error" })
    }
})


app.listen(5000, () => {
    console.log("App started")
})