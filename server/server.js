import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import {fileURLToPath} from "url";
import cookieParser from "cookie-parser";



/* ROUTES IMPORTS */
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import storeRoutes from "./routes/store.js"
import adminRoutes from "./routes/admin.js"
import {verifyAdminToken, verifyUserToken} from "./middleware/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));



/* ROUTES */

app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/auth', authRoutes)


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {

        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    })
    .catch((error) => console.log(`${error} did not connect`));
