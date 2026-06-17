import "dotenv/config";
import express from 'express';
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import userRouter from "./routes/userRoutes.js";
import projectRouter from "./routes/projectRoutes.js";
import { stripeWebhook } from "./controllers/stripeWebhook.js";
const app = express();
const corsOptions = {
    origin: process.env.TRUSTED_ORIGINS?.split(',') || [],
    credentials: true,
};
console.log("TRUSTED_ORIGINS:", process.env.TRUSTED_ORIGINS);
console.log("corsOptions:", corsOptions);
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.all("/api/auth/{*any}", toNodeHandler(auth));
app.post('api/stripe', express.raw({ type: 'application/json' }), stripeWebhook);
app.use(express.json({ limit: '50mb' }));
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send('Server is Live!');
});
app.use('/api/user', userRouter);
app.use('/api/project', projectRouter);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
