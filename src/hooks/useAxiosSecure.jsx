import axios from "axios";
import useAuth from "./useAuth";

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  if (!user) {
    return;
  }
  console.log(user);
  // Add a request interceptor
  instance.interceptors.request.use((config) => {
    // Do something before request is sent
    config.headers.authorization = `Bearer ${user.accessToken}`;

    return config;
  });
  return instance;
};

export default useAxiosSecure;
