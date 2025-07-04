import { Server } from "http";
import app from "./app";
import dotenv from "dotenv";
import { connectDB } from "./app/config/mongoDBDatabase";
dotenv.config();

const PORT = 4000;
let server: Server;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});