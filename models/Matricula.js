import mongoose from "mongoose";

const materiaEmbeddedSchema = new mongoose.Schema({
  nombre: String,
  codigo: String,
  creditos: Number
}, { _id: false });

const matriculaSchema = new mongoose.Schema({
  estudiante: { type: mongoose.Schema.Types.ObjectId, ref: "Estudiante", required: true },
  materias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Materia" }], 
  materiasInfo: [materiaEmbeddedSchema], 
  fechaMatricula: { type: Date, default: Date.now }
});

export default mongoose.model("Matricula", matriculaSchema);
