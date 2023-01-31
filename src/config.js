import { config } from "dotenv";
config();

export default {
    host: process.env.HOST || "error", 
    database:process.env.DATABASE || "",
    user:process.env.USER || "",
    pass:process.env.PASS || ""
}; 