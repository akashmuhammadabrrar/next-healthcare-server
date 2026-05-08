import { IJWTPaload } from "../../app/types/common";

declare global {
    namespace Express {
        interface Request {
            user?: IJWTPaload;
        }
    }
}
