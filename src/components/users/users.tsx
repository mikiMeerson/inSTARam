import { useEffect, useState } from 'react';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { deleteUser, getUsers, logout } from '../../services/user-service';

interface userRowType {
  id: string;
  name: string;
  unit: string;
  username: string;
  createdAt: string | null;
}
const Users = () => {
  const [rows, setRows] = useState<userRowType[]>([]);
  const [selectedUser, setSelectedUser] = useState<userRowType>();
  const [userAction, setUserAction] = useState<'delete' | 'edit'>();
  const [openDialog, setOpenDialog] = useState(false);

  const getDisplayDate = (time: Date) => {
    const displayDate = `
    ${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}
  `;
    return displayDate;
  };

  const selectUser = (params: GridCellParams) => {
    const user: userRowType = params.row;
    const action = params.field;
    setSelectedUser(user);

    if (action === 'delete') {
      setUserAction(action);
      setOpenDialog(true);
    } else if (action === 'edit') {
      setUserAction(action);
      // todo transfer to edit page
    }
  };

  const createRows = (fetchedUsers: IUser[]) => {
    const newRows: userRowType[] = [];
    fetchedUsers.forEach((user: IUser) => {
      newRows.push({
        id: user._id,
        name: user.name,
        unit: user.unit,
        username: user.username,
        createdAt:
          user.createdAt ? getDisplayDate(new Date(user.createdAt)) : null,
      });
    });

    setRows(newRows);
  };

  const fetchUsers = (): void => {
    getUsers()
      .then((res) => {
        createRows(res.data.users);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  });

  const handleUserAction = () => {
    if (userAction === 'delete') {
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
            }
          },
        )
        .catch((err: string) => console.log(err));
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'שם', flex: 1 },
    { field: 'unit', headerName: 'יחידה', flex: 1 },
    { field: 'username', headerName: 'שם משתמש', flex: 1 },
    { field: 'createdAt', headerName: 'זמן יצירה', flex: 1 },
    {
      field: 'edit',
      headerName: '',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: () => (
        <Button
          color="secondary"
          startIcon={<EditOutlined />}
        />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: () => (
        <Button
          color="error"
          startIcon={<DeleteOutline />}
        />
      ),
    },
  ];

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        columnBuffer={8}
        autoHeight
        onCellClick={selectUser}
      />
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>מחיקת משתמש</DialogTitle>
        <DialogContent>
          <DialogContentText>האם למחוק את המשתמש?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            בטל
          </Button>
          <Button
            onClick={() => {
              setOpenDialog(false);
              handleUserAction();
            }}
            variant="contained"
            color="error"
          >
            מחק
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
