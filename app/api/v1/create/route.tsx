import dbConnect from "@/lib/dbConnection";
import { db } from "@/lib/firebase";
import Room from "@/models/room";

export const POST = async (request: any, response: any) => {

    let { name, username } = await request.json();

    if(!name || !username){
        return new Response('Name is missing bro', {status:420})
    }

    await dbConnect();

    const room = new Room({id:Date.now(), name});

    room.save();

    db.collection('userRoomsInfo').doc(username).collection('rooms').add({name:room.name, id:room.id});
    
    return new Response(JSON.stringify(room),{status:200});

}