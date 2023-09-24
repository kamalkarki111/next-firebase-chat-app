'use client'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { LoaderContext } from '@/context/loader.context';
import Link from 'next/link';
import { ErrorContext } from '@/context/error.context';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {

  const auth = useAuth();

  const router = useRouter();

  const Loader = React.useContext(LoaderContext);

  const errors = React.useContext(ErrorContext);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Loader.setShowLoader(true);

    fetch("/api/v1/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
        name: data.get('name')
      }),
    }).then((response: any) => {
      if(response.status === 200){

        response.json().then((data: any) => {
          if (data.username) {
            auth.setAuth(data);
            router.push('/home');
          }
          Loader.setShowLoader(false)
        })
      } else {
        Loader.setShowLoader(false)
        response.text().then((val: any) => {
          Loader.setShowLoader(false);
          errors.setError(val)
        })
      }
    },(err)=>{
      Loader.setShowLoader(false)
    }).catch(()=>{
      Loader.setShowLoader(false)
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="Full Name "
                  name="name"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username "
                  name="username"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}