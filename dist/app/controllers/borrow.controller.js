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
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const book_model_1 = require("../models/book.model");
exports.borrowRoute = express_1.default.Router();
// borrow a book
exports.borrowRoute.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { book, quantity, dueDate } = req.body;
        const foundBook = yield book_model_1.Book.findById(book);
        if (!foundBook || foundBook.copies < quantity) {
            return res.status(404).json({
                message: "Not enough copies available",
                success: false,
            });
        }
        foundBook.copies -= quantity;
        (_a = foundBook.updateAvailability) === null || _a === void 0 ? void 0 : _a.call(foundBook);
        yield foundBook.save();
        const borrowAdding = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        res.json({
            message: "Book borrowed successfully",
            success: true,
            data: borrowAdding,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Borrow failed",
            success: false,
            error: error instanceof Error ? error.message : String(error),
        });
    }
}));
// borrow summary
exports.borrowRoute.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBorrowBooks = yield borrow_model_1.Borrow.aggregate([
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
    }
    catch (error) {
        return res.status(500).json({
            message: "Summary fetch failed",
            success: false,
            data: null,
            error: error instanceof Error ? error.message : error,
        });
    }
}));
