import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from '@mui/material';
import {
  deleteUser,
  EditUser,
  getUserById,
  logout,
} from '../../services/user-service';

interface userRowType {
  id: string;
  name: string;
  unit: string;
  username: string;
  role: userRole;
  createdAt: string | null;
}

interface DialogProps {
  isOpen: boolean;
  setIsOpen: (param: boolean) => void;
  userAction: 'delete' | 'edit' | undefined;
  selectedUser: userRowType | undefined;
  fetchUsers: () => void;
}

const roles = ['viewer', 'editor', 'admin'];

const UserDialog = ({
  isOpen,
  setIsOpen,
  userAction,
  selectedUser,
  fetchUsers,
}: DialogProps) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('נא למלא שם')
      .max(10, 'השם לא יעלה על 10 תווים'),
    unit: Yup.string().required('נא למלא יחידה'),
    role: Yup.string().required('נא למלא הרשאות'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handleDeleteUser = () => {
    const loggedUser = localStorage.getItem('user');
    deleteUser(selectedUser!.id)
      .then(
        ({ status }) => {
          if (status !== 200) {
            throw new Error('Error! User not deleted');
          }
          fetchUsers();
          if (loggedUser
            && JSON.parse(loggedUser).message._id === selectedUser?.id) {
            logout();
            navigate('/login');
          }
        },
      )
      .catch((err: string) => console.log(err));
  };

  const handleEditUser = (formData: any) => {
    const loggedUser = localStorage.getItem('user');
    setIsOpen(false);
    selectedUser && getUserById(selectedUser.id)
      .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! User not found');
        } else if (data.user) {
          const existingUser = data.user;
          const newUser = JSON.parse(JSON.stringify(existingUser));
          newUser.name = formData.name;
          newUser.unit = formData.unit;
          newUser.role = formData.role;

          EditUser(existingUser, newUser)
            .then(() => {
              if (loggedUser
                && JSON.parse(loggedUser).message._id === selectedUser?.id) {
                logout();
                navigate('/login');
              }
              fetchUsers();
            });
        }
      });
  };

  if (userAction === 'delete' && selectedUser) {
    return (
      <Dialog
        dir="rtl"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>מחיקת משתמש</DialogTitle>
        <DialogContent>
          <DialogContentText>האם למחוק את המשתמש?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            בטל
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false);
              handleDeleteUser();
            }}
            variant="contained"
            color="error"
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  if (selectedUser) {
    return (
      <Dialog
        dir="rtl"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <DialogTitle>עריכת משתמש</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="שם"
                defaultValue={selectedUser.name}
                variant="outlined"
                {...register('name')}
                error={errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="יחידה"
                defaultValue={selectedUser.unit}
                variant="outlined"
                {...register('unit')}
                error={errors.unit}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <FormControl sx={{ width: '100%' }}>
                <InputLabel id="role">הרשאות</InputLabel>
                <Select
                  labelId="role"
                  defaultValue={selectedUser.role}
                  {...register('role')}
                  error={errors.role}
                  input={<Input />}
                >
                  {roles.map((role: string) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            בטל
          </Button>
          <Button
            onClick={handleSubmit(handleEditUser)}
            variant="contained"
            color="error"
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  return (
    <div />
  );
};

export default UserDialog;
