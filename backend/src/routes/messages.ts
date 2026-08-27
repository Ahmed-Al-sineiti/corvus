import { Router } from "express";
import prisma from "../lib/prisma.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { sendTelegramMessage } from "../services/telegram.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
    // 1. Save message to database
    const newMessage = await prisma.message.create({
      data: {
        firstName,
        lastName,
        ServiceType,
        email,
        message,
      },
    });

    // 2. Telegram
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
      console.log("Telegram notification sent successfully");
    } catch (telegramError) {
      console.error("Failed to send Telegram notification:", telegramError);
    }

    // 3. Email
    try {
      console.log("MAIL_TO:", process.env.MAIL_TO);
      console.log(
        "RESEND_API_KEY exists:",
        Boolean(process.env.RESEND_API_KEY),
      );

      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.MAIL_TO!,
        replyTo: email,
        subject: `New Website Message - ${firstName} ${lastName}`,
        html: `
          <h2>📩 New Website Message</h2>

          <p>
            <strong>Name:</strong>
            ${firstName} ${lastName}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Service:</strong>
            ${ServiceType}
          </p>

          <h3>Message:</h3>

          <p>
            ${message}
          </p>
        `,
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        console.log("Email sent successfully:", data);
      }
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    // 4. Respond to frontend
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
