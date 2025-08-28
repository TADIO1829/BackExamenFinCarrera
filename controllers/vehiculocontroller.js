
import Vehiculo from "../models/Vehiculo.js";

export const crearVehiculo = async (req, res) => {
  try {
    const { marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion } = req.body;
    const existing = await Vehiculo.findOne({ placa });
    if (existing) return res.status(400).json({ error: "Vehículo ya existe" });

    const vehiculo = new Vehiculo({ marca, modelo, anio_fabricacion, placa, color, tipo_vehiculo, kilometraje, descripcion });
    await vehiculo.save();
    res.json({ message: "Vehículo creado exitosamente", vehiculo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.json(vehiculos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: "Vehículo no encontrado" });
    res.json(vehiculo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const actualizarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vehiculo) return res.status(404).json({ error: "Vehículo no encontrado" });
    res.json({ message: "Vehículo actualizado", vehiculo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarVehiculo = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findByIdAndDelete(req.params.id);
    if (!vehiculo) return res.status(404).json({ error: "Vehículo no encontrado" });
    res.json({ message: "Vehículo eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
