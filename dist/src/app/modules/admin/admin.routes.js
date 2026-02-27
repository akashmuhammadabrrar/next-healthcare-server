import express from "express";
import { AdminController } from "./admin.controller";
import { fileUploader } from "../../../helper/fileUploader";
import { AdminValidation } from "./admin.validation";
const router = express.Router();
router.post("/create-admin", fileUploader.upload.single('file'), (req, res, next) => {
    req.body = AdminValidation.createAdminValidationSchema.parse(JSON.parse(req.body.data));
    return AdminController.createAdmin(req, res, next);
});
export const adminRoutes = router;
