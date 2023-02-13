import axios from "axios";

// returns all registered users
export const getAllUsers = async () => {
  const { data } = await axios.get("http://localhost:8080/users");
  return data;
};