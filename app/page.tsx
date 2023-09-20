'use client'
import { useAuth } from '@/hooks/useAuth'
import { Button, ButtonGroup } from '@material-ui/core'
import { DoorSlidingRounded } from '@mui/icons-material'
import { DialogContent, DialogTitle, FormControl, FormLabel, Input, Modal, ModalDialog, Stack } from '@mui/joy'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {

  const [openJoinRoomPopup, setJoinRoomPopup ] = useState(false);
  const [openCreateRoomPupup, setOpenCreateRoomPopup] = useState(false);

  const router  = useRouter()

  const auth = useAuth();

  if(!auth.auth.username){
    router.push('/register');
  }


  const joinRoom = (ev:any)=>{
    fetch('/api/v1/join',{
      method: "POST",
      body: JSON.stringify({
      id : ev.target[0].value,
      })
    }).then((val)=>{
      if(val.status === 200){
        router.push('/room?id=' + ev.target[0].value);
      }
    })
  }

  const createRoom = (ev:any)=>{
    fetch('/api/v1/create',{
      method: "POST",
      body: JSON.stringify({
      name : ev.target[0].value,
      })
    }).then( (val)=>{
      debugger
      if(val.status === 200){
        val.json().then((data)=>{
          router.push('/room?id=' + data.id);
        });
      }
    })
  }

  return (
    <div className='flex h-full w-full align-items-center justify-items-center'>
      <ButtonGroup className='w-full'>
        <Button className='w-1/2' onClick={()=>setJoinRoomPopup(true)} size={'large'} startIcon={<DoorSlidingRounded/>} color='primary' variant={'contained'}> Join Room </Button>
        <Button className='w-1/2' onClick={()=>setOpenCreateRoomPopup(true)} size={'large'} startIcon={<DoorSlidingRounded/>} color='secondary' variant={'outlined'}> Create Room </Button>
      </ButtonGroup>
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

    </div>
  )
}
