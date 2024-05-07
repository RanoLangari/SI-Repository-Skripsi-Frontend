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

export const adminAuthSystem = async (url, endpoint, data) => {
  try {
    const response = await axios.post(`${url}/api/admin/${endpoint}`, data);
    return {
      status: response.status,
      token: response.data.token,
    };
  } catch (error) {
    throw error;
  }
};

export const ForgotPassword = async (url, endpoint, data) => {
  try {
    const response = await axios.post(`${url}/api/admin/${endpoint}`, data);
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    throw error;
  }
};

export const GetProfileAdmin = async (url, endpoint, token) => {
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

export const UpdateProfileAdmin = async (url, endpoint, data, token) => {
  try {
    const response = await axios.put(`${url}/api/admin/${endpoint}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
