import API from './api';

export const getTodos = async () => {
  try {
    const res = await API.get('/todos');
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const createTodo = async (formData: any) => {
  try {
    const res = await API.post('/todos', formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const getTodo = async (id: string) => {
  try {
    const res = await API.get(`/todos/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const updateTodo = async (id: string, formData: any) => {
  try {
    const res = await API.put(`/todos/${id}`, formData);
    return res.data;
  } catch (err) {
    throw err;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await API.delete(`/todos/${id}`);
    return res.data;
  } catch (err) {
    throw err;
  }
};
