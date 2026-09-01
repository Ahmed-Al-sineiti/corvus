import express from "express";
import cors from "cors";
import messageRouter from "../src/routes/messages.js";
import login from "../src/routes/login.js";
import { loginSchema, registerSchema } from "./schemas/auth.schema.js";
import "../src/services/discord.js";

import validate from "../src/middleware/validate.js";

const app = express();
const port = Number(process.env.PORT) || 5000;
const allowedOrigins = process.env.CORS_ORIGINS?.split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header include local tools such as curl.
      if (
        !origin ||
        !allowedOrigins?.length ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/messages", messageRouter);
app.use("/api/login", validate(loginSchema), login);

// Vercel invokes the exported app as a serverless function.
export default app;

// Keep `npm run dev` working locally without starting a listener on Vercel.
if (process.env.VERCEL !== "1") {
  app.listen(port, () => {
    console.log(`API listening on port ${port}`);
  });
}
