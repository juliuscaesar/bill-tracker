import express from "express";
import BillsModel from "./models/bills.js";
import BillEngagementsModel from "./models/billEngagements.js";
import UsersModel from "./models/users.js"

const router = express.Router();

const Bills = new BillsModel();
const BillEngagements = new BillEngagementsModel();
const Users = new UsersModel();

router.get("/bills", (req, res) => {
  const body = Bills.getAllBills();
  res.json({ body });
});

router.get("/engagements", (req, res) => {
  const body = BillEngagements.getAllBillEngagements();
  res.json({ body });
});

router.post("/engagementsByUser", (req, res) => {
  const { userId } = req.body;
  const body = BillEngagements.getBillEngagementsByUser(userId);
  res.json({ body });
});

router.post("/createEngagement", (req, res) => {
  const body = BillEngagements.createEngagement(req.body);
  res.json({ body });
});

router.post("/deleteEngagement", (req, res) => {
  const { engagementId, userId } = req.body;
  const body = BillEngagements.deleteEngagement(engagementId, userId);
  res.json({ body });
});

router.get("/users", (req, res) => {
  const body = Users.getAllUsers();
  res.json({ body });
});

export default router;
