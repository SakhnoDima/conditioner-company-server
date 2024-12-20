import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tasksRoutes from "./routes/tasks.js";

dotenv.config();

const app = express();
const PORT = 3001;

const corsOptions = {
  origin: "https://topwomen.careers",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/init-task", tasksRoutes);
// app.use("/v1", popularityRoutes);

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT} started`);
});
