import { Router } from "express";
import { prisma } from "../lib/prisma";
const router = Router();
router.get("/prisma-test", async (req, res) => {
    try {
        // 1) Create a user
        const user = await prisma.user.create({
            data: {
                email: `test${Date.now()}@example.com`,
                password: "password123", // Dummy password
                role: "PATIENT",
            },
        });
        // 2) Fetch all users
        const allUsers = await prisma.user.findMany();
        return res.json({
            message: "Prisma is working ✅",
            createdUser: user,
            allUsers,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Prisma test failed ❌",
            error,
        });
    }
});
export default router;
