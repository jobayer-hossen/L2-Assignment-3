import express, { Application, Request, Response } from "express";
import cors from "cors";
import { booksRoute } from "./app/controllers/book.controller";
import { borrowRoute } from "./app/controllers/borrow.controller";

const app: Application = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use("/api/books", booksRoute);
app.use("/api/borrow", borrowRoute);

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to library management system",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error,
    });
  }
});

export default app;
