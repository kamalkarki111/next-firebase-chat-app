import dbConnect from "@/lib/dbConnection";
import User from "@/models/user";
import { Mongoose } from "mongoose";
import { NextApiResponse } from "next";
import { hash } from 'bcryptjs'

export const POST = async (request: any, response: NextApiResponse) => {

    const { username, password, name } = await request.json();
    console.log(name)

    //encryption of password
    const encryptedPassword = await hash(password, 12);

    //db connection
    const conn: Mongoose = await dbConnect();

    const isUsernameTaken = await User.findOne({ username })

    if (!isUsernameTaken) {
        let user = new User({ username, password: encryptedPassword,fname:name })
        user.save();
        return new Response(JSON.stringify(user), { status: 200 });
    } else {
        return new Response('user name taken', { status: 420 });
    }


}