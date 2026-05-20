import express from "express";
import dotenv from "dotenv";
dotenv.config();
import dns from "node:dns";
import cors from "cors";

import cookieParser from "cookie-parser";

import mongoose from "mongoose";
import Authrouter from "./UserAuth/UserAuth.route.js";
import FloorRouter from "./Floor/floor.route.js";
import ProjectRouter from "./Project/Project.route.js";
import modelRouter from "./Model/model.route.js";
import FolderRouter from "./Folder/folder.route.js";
import RecentRouter from "./Recent/recent.route.js";
import EmployeeRouter from "./Employee/Employee.route.js";
import AdminRouter from "./Admin/AdminRoute.js";

const dnsServers = process.env.DNS_SERVERS?.split(",")
  .map((server) => server.trim())
  .filter(Boolean);

if (dnsServers?.length) {
  dns.setServers(dnsServers);
}






const app = express();

app.set("trust proxy", 1);


// Middlewares

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
  "https://admin.ur-wsl.com",
  "https://www.admin.ur-wsl.com",
  "https://ur-wsl.com",
  "https://www.ur-wsl.com",
  "http://localhost:5173",
  "http://localhost:5174",
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { protocol, hostname } = new URL(origin);
    const isHttp = protocol === "http:" || protocol === "https:";
    const isLocalHost =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "host.docker.internal";

    return isHttp && isLocalHost;
  } catch {
    return false;
  }
};

app.use(cors({
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
 res.send("hellow");

});
app.use("/auth",Authrouter);
app.use("/floors",FloorRouter);
app.use("/projects",ProjectRouter);
app.use("/models",modelRouter);
app.use("/folders",FolderRouter);
app.use("/recents",RecentRouter);
app.use("/employees",EmployeeRouter);
app.use("/admins",AdminRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server running on port ${PORT}`)
);
