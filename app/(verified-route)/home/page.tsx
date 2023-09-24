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
import { ErrorContext } from '@/context/error.context';
import MyRooms from '@/components/myRooms.components';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Home() {

  const [openJoinRoomPopup, setJoinRoomPopup] = React.useState(false);
  const [openCreateRoomPupup, setOpenCreateRoomPopup] = React.useState(false);
  const LoaderService = React.useContext(LoaderContext);
  const { auth } = React.useContext(AuthContext);
  const errors = React.useContext(ErrorContext);

  const router = useRouter();

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
      <MyRooms/>
      {/* End footer */}
    </ThemeProvider>
  </>
  );
}
