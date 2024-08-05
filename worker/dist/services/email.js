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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.senderemail,
        pass: process.env.POEMAILPASSWORD,
    },
});
function sendEmail(to, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let address = process.env.senderemail;
            const mailOptions = {
                from: {
                    name: 'chaitanya',
                    address: address,
                },
                to: to,
                subject: 'email from zapier',
                text: body,
            };
            console.log({ address });
            console.log({ user: process.env.senderemail });
            console.log({ pass: process.env.POEMAILPASSWORD });
            yield transporter.sendMail(mailOptions);
            return 'Email Sent Successfully';
        }
        catch (e) {
            return e;
        }
    });
}
exports.sendEmail = sendEmail;
