import { useEffect, useState } from 'react';
import { getUsers } from '../../services/user-service';

const Users = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = (): void => {
    getUsers()
      .then((res) => {
        console.log(res);
        setUsers(res.data.users);
      })
      .catch((err: Error) => console.log(err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {users && users.map((u) => <div>{u.name}</div>)}
    </div>
  );
};

export default Users;
