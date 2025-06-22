import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    genre: {
      type: String,
      enum: [
        "NON_FICTION",
        "FICTION",
        "SCIENCE",
        "BIOGRAPHY",
        "HISTORY",
        "FANTASY",
      ],
      required: [true, "Genre is required"],
      trim: true,
    },
    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    copies: {
      type: Number,
      required: [true, "Copies Area Required"],
      min: [0, "Copies must be a positive number"],
      trim: true,
    },
    available: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
