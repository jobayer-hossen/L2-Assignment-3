"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoDBDatabase_1 = require("./app/config/mongoDBDatabase");
dotenv_1.default.config();
const PORT = 4000;
let server;
(0, mongoDBDatabase_1.connectDB)().then(() => {
    app_1.default.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
