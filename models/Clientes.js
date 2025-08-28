import mongoose from "mongoose";

const clienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true, maxlength: [20, 'El nombre no puede superar 20 caracteres'] },
  apellido: { type: String, required: true, maxlength: [20, 'El apellido no puede superar 20 caracteres'] },
  cedula: { type: String, required: true, unique: true, maxlength: [10, 'La cédula no puede superar 10 caracteres'] },
  email: { type: String, required: true, unique: true, maxlength: [50, 'El email no puede superar 50 caracteres'] },
  telefono: { type: String, maxlength: [15, 'El teléfono no puede superar 15 caracteres'] },
  ciudad: { type: String, required: true, maxlength: [30, 'La ciudad no puede superar 30 caracteres'] },
  direccion: { type: String, required: true, maxlength: [100, 'La dirección no puede superar 100 caracteres'] },
  fecha_nacimiento: { type: String, required: true }
});

export default mongoose.model("Cliente", clienteSchema);

