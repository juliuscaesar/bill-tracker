import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// returns all created bill engagements
export const getAllBillEngagements = async () => {
  const { data } = await axios.get("http://localhost:8080/engagements");
  return data;
};

// returns bill engagements associated with a given user
export const getEngagementsByUserId = async (userId) => {
  const { data } = await axios.post("http://localhost:8080/engagementsByUser", {
    userId: userId,
  });
  return data;
};

// creates a bill engagement
export const createEngagement = async (billId, userId, supportedByUser) => {
  const { data } = await axios.post("http://localhost:8080/createEngagement", {
    id: uuidv4(),
    billId: billId,
    userId: userId,
    supportedByUser: supportedByUser,
    createdAt: new Date().toISOString(),
  });
  return data;
};

// deletes a bill engagement
export const deleteEngagement = async (engagementId, userId) => {
  const { data } = await axios.post("http://localhost:8080/deleteEngagement", {
    engagementId: engagementId,
    userId: userId,
  });
  return data;
};
