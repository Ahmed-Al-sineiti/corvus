import { Router } from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const checkAcc = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!checkAcc) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const addAcc = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
        },
      });
      
      return res.status(201).json({ message: "User created successfully" });
    } else {
      return res.status(400).json({ message: "Email already exists" });
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export default router;
