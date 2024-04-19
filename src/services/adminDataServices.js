import axios from "axios";


export const fetchSkripsiData = async (url, endpoint, token) => {
  try {
    const response = await axios.get(`${url}/api/admin/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};