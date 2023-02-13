import axios from "axios";

// gets all the bills
export const getAllBills = async () => {
  const { data } = await axios.get("http://localhost:8080/bills");
  return data;
};
