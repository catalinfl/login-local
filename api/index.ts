import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { UserSchemaType } from './models/UserSchema';
import { User } from "./models/UserSchema"
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

interface JwtPayload {
    email: string
}

const app = express();

dotenv.config()

const URL = process.env.MONGOURL as string
const JWT_SECRET = process.env.SECRET as string


app.use(cors())
app.use(express.json())

mongoose.connect(URL)
        .then(() => {
            console.log("Connect to database")
        })
        .catch((e) => console.log(e))


app.post("/register", async (req: Request, res: Response) => {

    const { fname, lname, email, password } = req.body

    const encryptedPassword = await bcrypt.hash(password, 10)
    
    try {
        const oldUser = await User.findOne({ email })
        if (oldUser) {
            res.json({ error: "User exists" })
        }
        await User.create<UserSchemaType>({
            fname,
            lname,
            email,
            password: encryptedPassword,
        })
        res.send({ status: "ok" })
    }
    catch(err) {
        res.send({ status: "error" })
    }
})

app.post("/login-user", async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.json({ error: "User not found" })
    }
    if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET)
        if (res.status(201)) {
            return res.json({ status: "ok", data: token })
        }
        else {
            return res.json({ status: "error" })
        }
    }
    res.json({
        status: "error", error: "Invalid password"
    })
})


app.post("/userData", async(req: Request, res: Response) => {
    const { token } = req.body;
    try {
        const user: jwt.JwtPayload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
        const userEmail = user.email
        User.findOne({ email: userEmail })
        .then((data) => {
            res.send({ status: "ok", data: data })
        })
        .catch((error) => {
            res.send( { status: "error", data: error })
        })
    }
    catch(err) {
        console.log(err)
    }
})

app.listen(5000, () => {
    console.log("App started")
})