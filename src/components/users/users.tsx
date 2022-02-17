import { useEffect, useState } from 'react';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { DeleteOutline, EditOutlined } from '@mui/icons-material';
import { getUsers } from '../../services/user-service';
import UserDialog from './userDialog';

interface userRowType {
  id: string;
  name: string;
  unit: string;
  username: string;
  role: userRole;
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

    if (action === 'delete' || action === 'edit') {
      setUserAction(action);
      setOpenDialog(true);
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
        role: user.role,
        createdAt:
          user.createdAt ? getDisplayDate(new Date(user.createdAt)) : null,
      });
    });

    setRows(newRows);
  };

  const fetchUsers = async (): Promise<void> => {
    const { data } = await getUsers();
    createRows(data.users);
  };

  useEffect(() => {
    fetchUsers();
  });

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    { field: 'name', headerName: 'שם', flex: 1 },
    { field: 'unit', headerName: 'יחידה', flex: 1 },
    { field: 'username', headerName: 'שם משתמש', flex: 1 },
    { field: 'role', headerName: 'הרשאות', flex: 1 },
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
      <UserDialog
        isOpen={openDialog}
        setIsOpen={setOpenDialog}
        userAction={userAction}
        selectedUser={selectedUser}
        fetchUsers={fetchUsers}
      />
    </>
  );
};

export default Users;
