import express from "express";
import cors from "cors";
import messageRouter from "../src/routes/messages.js";
import register from "../src/routes/register.js";
import login from "../src/routes/login.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRouter);
app.use("/api/register", register);
app.use("/api/login", login);

app.listen(PORT, () => {
  console.log("running rn");
});
