import express from "express";
import cors from "cors";
import "./loadenv.js";
import products from "./routes/index.js";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

const PORT = process.env.PORT || 5050;
const version = process.env.VERSION || "v1";
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 20,
});

app.use(cors());
app.use(express.json());
app.use(compression());
app.use(limiter);
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
);

app.use(`/api/${version}/products`, products);

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
