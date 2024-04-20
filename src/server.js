import express from "express";
import cors from "cors";
import "./loadenv.js";
import products from "./routes/index.js";

const PORT = process.env.PORT || 5050;
const version = process.env.VERSION || "v1";
const app = express();

app.use(cors());
app.use(express.json());

app.use(`/api/${version}/products`, products);

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
