import { client } from '../services/fetchClient';

export const getAllUsers = () => {
  return client.get('/users');
};

export const deleteUser = (id) => {
  return client.delete(`/users/${id}`);
};

export const createUser = (data) => {
  return client.post('/users', data);
};

export const updateUser = ({ id, data }) => {
  return client.patch(`/users/${id}`, data);
};
