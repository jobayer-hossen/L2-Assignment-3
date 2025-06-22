"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
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
}, { versionKey: false, timestamps: true });
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
