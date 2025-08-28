import mongoose from "mongoose";

const vehiculoSchema = new mongoose.Schema({
  marca: { type: String, required: true, maxlength: [20, 'La marca no puede superar 20 caracteres'] },
  modelo: { type: String, required: true, unique: true },
  anio_fabricacion:{type:String,required:true,unique:true,maxlength:[4,'El año de fabricación no puede superar 4 caracteres']},
  placa:{type:String,required:true,unique:true,maxlength:[7,'La placa no puede superar 10 caracteres']},
  color:{type:String,required:true,maxlength:[15,'El color no puede superar 15 caracteres']},
  tipo_vehiculo:{type:String,required:true,maxlength:[15,'El tipo de vehículo no puede superar 15 caracteres']},
  kilometraje:{type:String,required:true,min:[0,'El kilometraje no puede ser negativo']},
  descripcion: { type: String, maxlength: [100, 'La descripción no puede superar 100 caracteres'] },
});

export default mongoose.model("Vehiculo", vehiculoSchema);
