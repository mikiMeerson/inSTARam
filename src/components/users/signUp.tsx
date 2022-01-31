import { FormEventHandler, useState } from 'react';
import {
  Avatar,
  CssBaseline,
  Grid,
  Container,
  TextField,
  Typography,
  Box,
  FormControlLabel,
  Button,
  Link,
  Checkbox,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LockOutlined } from '@mui/icons-material';
import AuthService from '../../services/auth.service';

const theme = createTheme();

const SignUp = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = () => {
    AuthService.register(
      name,
      email,
      password,
    ).then(
      (response) => {
        setMessage(response.data.message);
        setSuccess(true);
      },
    ).catch((error) => {
      const resMessage = (error.response
                && error.response.data
                && error.response.data.message)
              || error.message
              || error.toString();
      setSuccess(false);
      setMessage(resMessage);
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={() => handleSubmit()}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                    }
                  label="I want to receive promotions and updates via email."
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
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
