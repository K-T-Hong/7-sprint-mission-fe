import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import productAPI from "./api/products.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/products", productAPI);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port} 포트에서 서버 실행중!`));
