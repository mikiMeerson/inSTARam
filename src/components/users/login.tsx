import { useState } from 'react';
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  Button,
  TextField,
  Avatar,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/user-service';

const Login = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // todo add form validation
    login(username, password)
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! wrong credentials');
        }
        navigate('/stars');
        console.log('Login successful');
        window.location.reload();
      })
      .catch((err: string) => console.log(err));
  };

  return (
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="שם משתמש"
            autoFocus
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            היכנס
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register">
                עדיין לא נרשמת? לחץ כאן
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
