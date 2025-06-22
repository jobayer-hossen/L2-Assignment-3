import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/book.model";

export const borrowRoute = express.Router();

// borrow a book
borrowRoute.post("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const { book, quantity, dueDate } = req.body;

    const foundBook = await Book.findById(book);

    if (!foundBook || foundBook.copies < quantity) {
      return res.status(404).json({
        message: "Not enough copies available",
        success: false,
      });
    }

    foundBook.copies -= quantity;

    foundBook.updateAvailability?.();

    await foundBook.save();

    const borrowAdding = await Borrow.create({ book, quantity, dueDate });

    res.json({
      message: "Book borrowed successfully",
      success: true,
      data: borrowAdding,
    });
  } catch (error) {
    res.status(500).json({
      message: "Borrow failed",
      success: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// borrow summary
borrowRoute.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const allBorrowBooks = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    return res.status(200).json({
      message: "Borrowed books summary retrieved successfully",
      success: true,
      data: allBorrowBooks,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Summary fetch failed",
      success: false,
      data: null,
      error: error instanceof Error ? error.message : error,
    });
  }
});
