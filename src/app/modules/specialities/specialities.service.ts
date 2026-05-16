import { Request } from "express";
import { fileUploader } from "../../../helper/fileUploader";
import { prisma } from "../../../lib/prisma";
import calculatePagination from "../../../helper/paginationHelper";

// ─── Types ────────────────────────────────────────────────────────────────────

export type IPaginationOptions = {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
};

// ─── Create ───────────────────────────────────────────────────────────────────

const insertIntoDB = async (req: Request) => {
    const file = req.file;

    if (file) {
        const uploaded = await fileUploader.uploadToCloudinary(file);
        req.body.icon = uploaded?.secure_url;
    }

    return prisma.specialties.create({
        data: req.body,
    });
};

// ─── Read All ─────────────────────────────────────────────────────────────────

const getAllFromDB = async (options: IPaginationOptions) => {
    const { page, limit, skip, sortBy, sortOrder } = calculatePagination(options);

    const [result, total] = await Promise.all([
        prisma.specialties.findMany({
            skip,
            take: limit,
            orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { createdAt: "desc" },
        }),
        prisma.specialties.count(),
    ]);

    return {
        meta: { total, page, limit },
        data: result,
    };
};

// ─── Delete ───────────────────────────────────────────────────────────────────

const deleteFromDB = async (id: string) => {
    return prisma.specialties.delete({
        where: { id },
    });
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export const SpecialtiesService = {
    insertIntoDB,
    getAllFromDB,
    deleteFromDB,
};