import dbConnect from "@/lib/dbConnection";
import { db } from "@/lib/firebase";
import Room from "@/models/room";

export const POST = async (request: any, response: any) => {

    let { id , username} = await request.json();

    if (!id) {
        return new Response('ID is missing bro', { status: 420 })
    }

    await dbConnect();

    const room = await Room.findOne({ id });

    if (!room) {
        return new Response('Room ID not avaible', { status: 404 })
    }

    return new Response(JSON.stringify({name:room.name, id:room.id}), { status: 200 });
}