import experess  from "express";
import { AuthController } from "./auth.controller";


const router =  experess.Router();

// create patient user
router.post(
     "/login",
     AuthController.login
)

export const atuhRoutes = router;
