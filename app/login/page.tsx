'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import Add from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';

export default function Login() {

  const router = useRouter();

  const auth = useAuth();

  React.useEffect(() => {
    if (auth.auth.username) {
      router.push('/');
    }
  }, [auth.auth.username, router])

  function login(ev: any) {
    console.log(ev)
    fetch("/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        username: ev.target[0].value,
        password: ev.target[1].value
      }),
    }).then((response: any) => {
      response.json().then((data: any) => {
        if (data.username) {
          auth.setAuth(data);
          router.push('/');
        }
      })
    });
  }

  return (
    <React.Fragment>
      <Modal open={true}>
        <ModalDialog size='lg' variant='soft' color='success'>
          <DialogTitle>Login</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              login(event);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>UserName</FormLabel>
                <Input variant='soft' color='neutral' autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input variant='soft' color='neutral' required type={'password'} />
              </FormControl>
              <Button type="submit">Login</Button>
            </Stack>
          </form>
          <Link href={'/register'}>New here...?</Link>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}