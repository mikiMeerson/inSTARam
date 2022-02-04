import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

export const getPublisher = () => {
  const usrstr = localStorage.getItem('user');

  if (usrstr) {
    const user = JSON.parse(usrstr).message;
    return `${user.name} - ${user.unit}`;
  }

  return '';
};

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
        getPublisher(),
      );
    }
    return userFound;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const register = async (formData: IUser) => {
  try {
    const user: Omit<IUser, '_id'> = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      unit: formData.unit,
      roles: [],
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

export const updateUserField = async (
  field: keyof IUser,
  user: IUser,
  newValue: string | string[],
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const userUpdate = Object.assign(user, { [field]: newValue });

    const updatedUser: AxiosResponse<ApiUsersType> = await axios.put(
      `${baseUrl}/edit-user/${user._id}`,
      userUpdate,
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
