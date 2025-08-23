import mongoose from "mongoose";

const estudianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  cedula: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String }
});

export default mongoose.model("Estudiante", estudianteSchema);

