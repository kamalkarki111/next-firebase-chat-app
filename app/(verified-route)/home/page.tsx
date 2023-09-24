'use client'
import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog } from '@mui/joy';
import { LoaderContext } from '@/context/loader.context';
import { AuthContext } from '@/context/auth.context';
import { db } from '@/lib/firebase';
import Link from 'next/link';
import { Groups3 } from '@mui/icons-material';
import { ErrorContext } from '@/context/error.context';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {

  const [openJoinRoomPopup, setJoinRoomPopup] = React.useState(false);
  const [openCreateRoomPupup, setOpenCreateRoomPopup] = React.useState(false);
  const LoaderService = React.useContext(LoaderContext);
  const { auth } = React.useContext(AuthContext);
  const errors = React.useContext(ErrorContext);

  const router = useRouter();

  const [myRooms, setMyRooms] = React.useState<Array<any>>([])

  const joinRoom = (ev: any) => {
    LoaderService.setShowLoader(true)
    fetch('/api/v1/join', {
      method: "POST",
      body: JSON.stringify({
        id: ev.target[0].value,
      })
    }).then((val) => {
      if (val.status === 200) {
        val.json().then((data) => {
          router.push('/chat?id=' + data.id + '&name=' + data.name);
        });
        LoaderService.setShowLoader(false)
      } else {
        val.text().then((val: any) => {
          LoaderService.setShowLoader(false);
          errors.setError(val)
        })
      }
    })
  }

  const createRoom = (ev: any) => {
    LoaderService.setShowLoader(true)
    fetch('/api/v1/create', {
      method: "POST",
      body: JSON.stringify({
        name: ev.target[0].value,
        username: auth.username
      })
    }).then((val) => {
      if (val.status === 200) {
        val.json().then((data) => {
          router.push('/chat?id=' + data.id + '&name=' + data.name);
        });
        LoaderService.setShowLoader(false)
      } else {
        LoaderService.setShowLoader(false)
      }
    })
  }

  React.useEffect(() => {
    const unsub = db.collection('userRoomsInfo').doc(auth.username).collection('rooms').onSnapshot((val) => {
      const data = val.docs.map((val) => val.data())
      setMyRooms(data)
      return ()=>{
        unsub()
      }
    })
  },[])

  return (<>

    <Modal open={openJoinRoomPopup} onClose={() => setJoinRoomPopup(false)}>
      <ModalDialog>
        <DialogTitle>Join Room</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setJoinRoomPopup(false);
            joinRoom(event);
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Room ID</FormLabel>
              <Input autoFocus required />
            </FormControl>
            <Button type="submit">Join</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
    <Modal open={openCreateRoomPupup} onClose={() => setOpenCreateRoomPopup(false)}>
      <ModalDialog>
        <DialogTitle>Create Room</DialogTitle>
        <form
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            setOpenCreateRoomPopup(false);
            createRoom(event)
          }}
        >
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Room Name</FormLabel>
              <Input autoFocus required />
            </FormControl>
            <Button type="submit">Create</Button>
          </Stack>
        </form>
      </ModalDialog>
    </Modal>
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              CHIT CHAT
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              This is the best Chat application present out there on the earth.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={() => setJoinRoomPopup(true)} variant="contained">Join Chat Group</Button>
              <Button onClick={() => setOpenCreateRoomPopup(true)} variant="outlined">Create Chat Group</Button>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="brown"
        gutterBottom
      >
        My Rooms
      </Typography>
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
      {/* End footer */}
    </ThemeProvider>
  </>
  );
}
