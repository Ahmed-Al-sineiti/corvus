import express from "express";
import cors from "cors";
import messageRouter from "../src/routes/messages.js";
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRouter);

app.listen(PORT, () => {
  console.log("running rn");
});
