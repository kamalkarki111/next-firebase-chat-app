import dbConnect from "@/lib/dbConnection";
import Room from "@/models/room";

export const POST = async (request: any, response: any) => {

    let { name } = await request.json();

    if(!name){
        return new Response('Name is missing bro', {status:420})
    }

    await dbConnect();

    const room = new Room({id:Date.now(), name});

    room.save();
    
    return new Response(JSON.stringify(room),{status:200})
}