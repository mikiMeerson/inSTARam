import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
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
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('נא למלא שם משתמש'),
    password: Yup.string()
      .required('נא למלא סיסמה'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: any) => {
    // todo add form validation
    login(data.username, data.password)
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
    <Container component="main" sx={{ width: '50%' }}>
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
        <Box sx={{ mt: 1, width: '50%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="שם משתמש"
            autoFocus
            {...register('username')}
            error={errors.username}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.username?.message}
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="סיסמה"
            type="password"
            {...register('password')}
            error={errors.password}
          />
          <Typography variant="inherit" color="textSecondary">
            {errors.password?.message}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
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
