import { useAuth } from "@/hooks/useAuth"
import { db } from "@/lib/firebase"
import { Groups3 } from "@mui/icons-material"
import { Box } from "@mui/joy"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function MyRooms() {

    const {auth} = useAuth();

    const [myRooms, setMyRooms] = useState<Array<any>>([])
    useEffect(() => {
        const unsub = db.collection('userRoomsInfo').doc(auth.username).collection('rooms').onSnapshot((val) => {
            const data = val.docs.map((val) => val.data())
            setMyRooms(data);
            console.log(data)
            return () => {
                unsub()
            }
        })
    }, [])
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 1, display: 'flex', flexWrap: 'wrap' }} component="footer">

            {myRooms.map((room) => <div key={room.id} className="w-2/6 m-5 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center pb-10">
                    <Groups3></Groups3>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                        {room.name}
                    </h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {room.id}
                    </span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <Link
                            href={'/chat?id=' + room.id + '&name=' + room.name}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Open
                        </Link>
                    </div>
                </div>
            </div>)}

        </Box>
    )
}