import axios, { AxiosResponse } from 'axios';
import { baseUrl } from '../globals';

export const getUsers = async (): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const users: AxiosResponse<ApiUsersType> = await axios.get(
      `${baseUrl}/users`,
    );
    return users;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const register = async (
  formData: IUser,
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const user: Omit<IUser, '_id'> = {
      username: formData.username,
      password: formData.password,
      name: formData.name,
      unit: formData.unit,
      roles: [],
    };

    const saveUser: AxiosResponse<ApiUsersType> = await axios.post(
      `${baseUrl}/add-user`,
      user,
    );
    localStorage.setItem('user', JSON.stringify(saveUser.data.user));
    return saveUser;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const credentials = { username, password };
    const userFound: AxiosResponse<ApiUsersType> = await axios
      .post(`${baseUrl}/login`, credentials);

    if (userFound.data.user) {
      localStorage.setItem(
        'user',
        JSON.stringify(userFound.data.user),
      );
    }
    return userFound;
  } catch (error) {
    throw new Error(error as string);
  }
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const updateUser = async (
  userId: string,
  newUser: IUser,
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const updatedUser: AxiosResponse<ApiUsersType> = await axios.put(
      `${baseUrl}/edit-user/${userId}`,
      newUser,
    );
    return updatedUser;
  } catch (error) {
    throw new Error(error as string);
  }
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
): Promise<AxiosResponse<ApiUsersType>> => {
  try {
    const deletedUser: AxiosResponse<ApiUsersType> = await axios.delete(
      `${baseUrl}/delete-user/${_id}`,
    );
    return deletedUser;
  } catch (error) {
    throw new Error(error as string);
  }
};
