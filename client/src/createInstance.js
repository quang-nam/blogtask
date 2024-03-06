import axios from "axios";
import { jwtDecode } from "jwt-decode";

const refreshToken = async () => {
  try {
    const res = await axios.post(
      "/api/auth/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
// rename lại axios instance
export const axiosInstance = (accessToken, setUser, dispatch) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(async (config) => {
    const date = new Date();
    const decodedToken = jwtDecode(accessToken);
    if (decodedToken.exp < date.getTime() / 1000) {
      const data = await refreshToken();
      const newToken = {
        ...decodedToken,
        access_token: data.access_token,
      };
      dispatch(setUser(data));
      config.headers["Authorization"] = "Bearer " + newToken.access_token;
    }
    return config;
  });

  return newInstance;
};
