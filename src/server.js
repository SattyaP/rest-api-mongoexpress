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
  windowMs: 24 * 60 * 60 * 1000,
  max: process.env.MAX_REQUESTS || 1000,
  handler: (req, res) => {
    res.status(429).send("Too many requests, please try again later.");
  },
  skip: (req) => req.ip === process.env.TRUSTED_IP || false,
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

app.get("/api", (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  res.status(200).send("Hello World!");
});
app.use(`/api/${version}/products`, products);

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

app.listen(PORT, (req) => {
  console.log(`Server is running on port: ${PORT}`);
});
