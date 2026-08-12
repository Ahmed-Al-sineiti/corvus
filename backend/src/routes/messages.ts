import { Router } from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json(messages);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        message,
      },
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to create message!",
    });
  }
});

export default router;
