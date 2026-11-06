import express from "express";

//middlewares import
import notFound from "./middlewares/notFound.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());

app.use(notFound);
app.use(errorHandler);

export default app;