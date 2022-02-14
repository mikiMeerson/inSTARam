import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Container,
  CssBaseline,
  Box,
  Grid,
  TextField,
  Button,
  Avatar,
  Typography,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { signUp } from '../../services/user-service';

const Register = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('נא למלא שם'),
    unit: Yup.string()
      .required('נא למלא יחידה'),
    username: Yup.string()
      .required('נא למלא שם משתמש')
      .min(6, 'שם המשתמש חייב להיות לפחות באורך 6 תווים')
      .max(14, 'שם המשתמש לא יכול להיות יותר מ-14 תווים'),
    password: Yup.string()
      .required('נא למלא סיסמה')
      .min(8, 'הסיסמה חייבת להיות לפחות באורך 8 תווים')
      .max(20, 'הסיסמה לא יכולה להיות יותר מ-20 תווים'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const resetForm = () => {
    resetField('name');
    resetField('password');
    resetField('username');
    resetField('password');
  };

  const onSubmit = (data: any) => {
    const {
      name, unit, username, password,
    } = data;
    signUp({
      _id: '0', username, password, name, unit, role: 'viewer',
    })
      .then(({ status }) => {
        if (status !== 200) {
          throw new Error('Error! user not saved');
        }
        navigate('/stars');
        window.location.reload();
      })
      .catch((err: string) => console.log(err));
    resetForm();
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
          Sign up
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="שם"
                autoFocus
                {...register('name')}
                error={errors.name}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.name?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="יחידה"
                {...register('unit')}
                error={errors.unit}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.unit?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="שם משתמש"
                {...register('username')}
                error={errors.username}
              />
              <Typography variant="inherit" color="textSecondary">
                {errors.username?.message}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
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
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 3, mb: 2 }}
          >
            הירשם
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">
                כבר רשום? לחץ כאן
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
