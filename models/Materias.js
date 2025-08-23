import mongoose from "mongoose";

const materiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: true, unique: true },
  descripcion: { type: String },
  creditos: { type: Number, required: true }
});

export default mongoose.model("Materia", materiaSchema);
