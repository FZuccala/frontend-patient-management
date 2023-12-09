import axios from '@/utils/axios';

export const getUsers = async () => {
  try {
    const { data } = await axios.get('/users');
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong!');
  }
};
