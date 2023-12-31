import dbConnect from "@/lib/dbConnection";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { hash, compare } from 'bcryptjs';
import User from "@/models/user";

export const POST = async (request:any,response:NextApiResponse) => {

    const { username, password } = await request.json();

    if(!username || !password){
        return new Response('Something missing',{status:505});
    }

    //db connection
    const conn = await dbConnect();

    const user = await User.findOne({username})

    console.log(compare)

    var isValidcall:boolean = false;

    if(user){
        isValidcall = await compare(password+'', user.password)
    }

    if(isValidcall){
        return new Response(JSON.stringify(user),{status:200});
    } else {
        return new Response('Invalid creds bro',{status:420});
    }

}