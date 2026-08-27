import { Router } from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendTelegramMessage } from "../services/telegram.js";

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
  const { firstName, lastName, ServiceType, email, message } = req.body;

  try {
    const newMessage = await prisma.message.create({
      data: {
        firstName,
        lastName,
        ServiceType,
        email,
        message,
      },
    });

    const telegramText = `
📩 New Website Message

👤 Name: ${firstName} ${lastName}
📧 Email: ${email}

💬 Message:
${message}

🌐 Service:
${ServiceType}
`;

    try {
      await sendTelegramMessage(telegramText);
    } catch (telegramError) {
      console.error("Failed to send Telegram notification:", telegramError);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create message!",
    });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteMessage = await prisma.message.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      message: "Message deleted successfully",
      deleteMessage,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    } else {
      console.error("Unknown error:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
});
export default router;
