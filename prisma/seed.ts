import { UserRole } from "../generated/prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { prisma } from "../src/lib/prisma";

async function main() {
  const hashedPassword = await bcrypt.hash("Admin1234!", 12);

  const adminUser = await prisma.user.upsert({
    where: { email: "superadmin@healthcare.com" },
    update: {},
    create: {
      email: "superadmin@healthcare.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      needPasswordChange: false,
      admin: {
        create: {
          name: "Super Admin",
          contactNumber: "01700000000",
        },
      },
    },
  });

  console.log("✅ Super admin seeded:", adminUser.email);
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
