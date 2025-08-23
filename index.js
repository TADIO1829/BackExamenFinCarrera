import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/rutas.js";
import { connectDB } from "./config/db.js";
import materiaRoutes from "./routes/rutasmaterias.js";
import estudianteRoutes from "./routes/rutasestudiantes.js";
import matriculaRoutes from "./routes/rutasmatriculas.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use(authRoutes);
app.use("/materias", materiaRoutes);
app.use("/estudiantes", estudianteRoutes);
app.use("/matriculas", matriculaRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
