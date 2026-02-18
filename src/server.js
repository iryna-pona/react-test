import express from "express";
import cors from "cors";
import "dotenv/config";
import { errors } from "celebrate";

import travellersRoutes from "./routes/travellersRoutes.js";
import { notFoundHandler } from "./middleware/notFoundHandler.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

app.use(travellersRoutes);
app.use(usersRoutes);

// 404
app.use(notFoundHandler);

// celebrate errors
app.use(errors());

// global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});