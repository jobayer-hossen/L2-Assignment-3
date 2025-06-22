"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoute = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.booksRoute = express_1.default.Router();
// book creation
exports.booksRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookBody = req.body;
        const book = yield book_model_1.Book.create(bookBody);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Validation failed",
            success: false,
            error: error,
        });
    }
}));
// book retrieval
exports.booksRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filter, sortBy = "createdAt", sort = "asc", limit = "10", } = req.query;
    const query = filter ? { genre: filter } : {};
    try {
        const sortByOrder = sort === "desc" ? -1 : 1;
        const sortObj = {};
        sortObj[sortBy] = sortByOrder;
        const limitNumData = parseInt(limit, 10) || 10;
        const filteredBooks = yield book_model_1.Book.find(query)
            .sort(sortObj)
            .limit(limitNumData);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: filteredBooks,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving books",
            success: false,
            error: error,
        });
    }
}));
// book retrieval by ID
exports.booksRoute.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const foundBook = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: foundBook,
        });
        if (!foundBook || foundBook === null) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Book retrieving failed",
            success: false,
            error: error,
        });
    }
}));
// book update
exports.booksRoute.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const body = req.body;
        const updateBook = yield book_model_1.Book.findByIdAndUpdate(bookId, body, {
            new: true,
        });
        if (updateBook)
            yield updateBook.save();
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: updateBook,
        });
        if (!updateBook || updateBook === null) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Update failed",
            success: false,
            error: error,
        });
    }
}));
// book deletion
exports.booksRoute.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const foundBook = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null,
        });
        if (!foundBook || foundBook === null) {
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null,
            });
            return;
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Delete failed",
            success: false,
            error: error,
        });
    }
}));
