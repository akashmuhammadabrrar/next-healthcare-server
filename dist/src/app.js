import express from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import prismaTestRouter from "./routes/prismaTest";
import router from './app/routes';
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// user routes 
app.use("/api/v1", router);
app.use(prismaTestRouter);
app.get('/', (req, res) => {
    res.send({
        Message: "Ph health care server.."
    });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
