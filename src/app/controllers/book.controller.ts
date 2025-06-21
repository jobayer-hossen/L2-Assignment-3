import express, { Request, Response } from "express";
import { Book } from "../models/book.model";

export const booksRoute = express.Router();

// book creation
booksRoute.post("/", async (req: Request, res: Response) => {
  try {
    const bookBody = req.body;
    const book = await Book.create(bookBody);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    res.status(404).json({
      message: "Validation failed",
      success: false,
      error: error,
    });
  }
});

// book retrieval
booksRoute.get("/", async (req: Request, res: Response) => {
  const {
    filter,
    sortBy = "createdAt",
    sort = "asc",
    limit = "10",
  } = req.query;

  const query: any = filter ? { genre: filter } : {};

  try {
    const sortByOrder = sort === "desc" ? -1 : 1;
    const sortObj: any = {};
    sortObj[sortBy as string] = sortByOrder;

    const limitNumData = parseInt(limit as string, 10) || 10;

    const filteredBooks = await Book.find(query)
      .sort(sortObj)
      .limit(limitNumData);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: filteredBooks,
    });
  } catch (error) {
    res.status(404).json({
      message: "Error retrieving books",
      success: false,
      error: error,
    });
  }
});

// book retrieval by ID
booksRoute.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const findBook = await Book.findById(req.params.bookId);
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: findBook,
    });
  } catch (error) {
    res.status(404).json({
      message: "Book not found",
      success: false,
      error: error,
    });
  }
});

// book update route
booksRoute.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const body = req.body;

    const updateBook = await Book.findByIdAndUpdate(bookId, body, {
      new: true,
    });

    if (updateBook) await updateBook.save();

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updateBook,
    });
  } catch (error) {
    res.status(404).json({
      message: "Update failed",
      success: false,
      error: error,
    });
  }
});

// book deletion route
booksRoute.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      message: "Delete failed",
      success: false,
      error: error,
    });
  }
});
