import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const port = 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(port, () => {
  console.log(`🚀 Bill Tracker API listening on port ${port} 🚀`);
});
