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
    // Save message
    const newMessage = await prisma.message.create({
      data: {
        firstName,
        lastName,
        ServiceType,
        email,
        message,
      },
    });

    // Telegram
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
      console.log("Telegram sent successfully");
    } catch (error) {
      console.error("Telegram failed:", error);
    }

    // Email
    try {
      const { data, error } = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.MAIL_TO!,
        replyTo: email,
        subject: `New Website Message - ${firstName} ${lastName}`,
        html: `
    <!DOCTYPE html>
    <html lang="en">
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #000000; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #111111; border: 1px solid #222222; border-radius: 8px; overflow: hidden;">
              
              <!-- Header & Logo -->
              <tr>
                <td align="center" style="padding: 30px; border-bottom: 1px solid #222222; background-color: #0a0a0a;">
<img src="https://corvus.is-a.dev/logocor.svg" alt="Corvus Logo" style="height: 75px; width: auto; max-width: 100%; display: block;" />                </td>
              </tr>

              <!-- Email Body -->
              <tr>
                <td style="padding: 30px; color: #ededed;">
                  <h2 style="margin-top: 0; color: #ffffff; font-size: 20px;">New Website Inquiry</h2>

                  <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 25px;">
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222;">
                        <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Name</span><br/>
                        <strong style="color: #ffffff; font-size: 16px;">${firstName} ${lastName}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222;">
                        <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Email</span><br/>
                        <strong style="color: #ffffff; font-size: 16px;">
                          <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                        </strong>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 12px 0; border-bottom: 1px solid #222222;">
                        <span style="color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Service Requested</span><br/>
                        <strong style="color: #ffffff; font-size: 16px;">${ServiceType}</strong>
                      </td>
                    </tr>
                  </table>

                  <!-- Message Box -->
                  <h3 style="margin: 0 0 10px 0; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message Details</h3>
                  <div style="background-color: #050505; border: 1px solid #222222; border-radius: 6px; padding: 20px; color: #d4d4d4; line-height: 1.6; font-size: 15px; white-space: pre-wrap;">
${message}
                  </div>

                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td align="center" style="padding: 20px; background-color: #0a0a0a; border-top: 1px solid #222222; color: #555555; font-size: 12px;">
                  This message was sent from your website's contact form.
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `,
      });

      if (error) {
        console.error("Resend error:", error);
      } else {
        console.log("Email sent successfully:", data);
      }
    } catch (error) {
      console.error("Email failed:", error);
    }

    // Return response only once
    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
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
