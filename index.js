import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/rutas.js";
import { connectDB } from "./config/db.js";

import vehiculoRoutes from "./routes/rutasvehiculos.js";
import clienteRoutes from "./routes/rutasclientes.js"
import reservasRoutes from "./routes/rutasreservas.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


connectDB();


app.use(authRoutes);

app.use("/vehiculos", vehiculoRoutes);
app.use("/clientes", clienteRoutes);
app.use("/reservas", reservasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
