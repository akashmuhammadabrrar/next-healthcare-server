import { UserRole } from "../../../generated/prisma/client";

export type IJWTPaload = {
    email: string;
    role: UserRole
}