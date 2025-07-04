import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./app/config/mongoDBDatabase";
dotenv.config();

const PORT = 4000;
let server: Server;

app.use(cors({ origin: "*" })); 

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});