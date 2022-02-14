import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

export const getUsers = async (): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const users: AxiosResponse<ApiUsersType> = await axios.get(
      `${baseUrl}/all-users`,
    );
    return users;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const getUserById = async (
  userId: string,
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const user: AxiosResponse<ApiUsersType> = await axios.get(
      `${baseUrl}/user/${userId}`,
    );
    return user;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const login = async (username: string, password: string) => {
  try {
    const credentials = { username, password };
    const userFound = await axios
      .post(`${baseUrl}/login`, credentials);

    if (userFound.data.success) {
      localStorage.setItem(
        'user',
        JSON.stringify(userFound.data),
      );
      localStorage.setItem(
        'userDisplay',
        `${userFound.data.message.name} - ${userFound.data.message.unit}`,
      );
      localStorage.setItem('role', userFound.data.message.role);
    }
    return userFound;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const signUp = async (formData: IUser) => {
  try {
    const user: Omit<IUser, '_id'> = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      unit: formData.unit,
      role: 'viewer',
    };

    const saveUser = await axios.post(
      `${baseUrl}/add-user`,
      user,
    );
    if (saveUser.data.success) {
      await login(formData.username, formData.password);
    }
    return saveUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const EditUser = async (
  user: IUser,
  newUser: IUser,
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const updatedUser: AxiosResponse<ApiUsersType> = await axios.put(
      `${baseUrl}/edit-user/${user._id}`,
      newUser,
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const deleteUser = async (
  _id: string,
): Promise<AxiosResponse<any>> => {
  try {
    const deletedUser: AxiosResponse<any> = await axios.delete(
      `${baseUrl}/delete-user/${_id}`,
    );
    return deletedUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const authorizeUser = async (authorization: userRole) => {
  const rolesConversion = ['viewer', 'editor', 'admin'];
  let res = false;
  const loggedUser = localStorage.getItem('user');
  if (loggedUser) {
    const userId = JSON.parse(loggedUser).message._id;
    await getUserById(userId).then(({ data }) => {
      const userRole = data.user ? data.user.role : 'viewer';
      res = rolesConversion.indexOf(userRole) >= rolesConversion.indexOf(authorization);
    });
  }
  return res;
};
