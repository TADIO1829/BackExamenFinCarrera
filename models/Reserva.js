import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  codigo: { type: String, required: true,unique:true },
  descripcion: { type: String, required: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  vehiculos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vehiculo" }],
  fechaReserva: { type: Date, default: Date.now }
});

export default mongoose.model("Reserva", reservaSchema);
