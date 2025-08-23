import Estudiante from "../models/Estudiantes.js";


export const crearEstudiante = async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, telefono } = req.body;

    const existing = await Estudiante.findOne({ $or: [{ cedula }, { email }] });
    if (existing) return res.status(400).json({ error: "Cédula o email ya registrado" });

    const estudiante = new Estudiante({ nombre, apellido, cedula, email, telefono });
    await estudiante.save();

    res.json({ message: "Estudiante creado exitosamente", estudiante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerEstudiantes = async (req, res) => {
  try {
    const estudiantes = await Estudiante.find();
    res.json(estudiantes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(estudiante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerEstudianteCedula = async (req, res) => {
  try {
    const estudiante = await Estudiante.findOne({ cedula: req.params.cedula });
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json(estudiante);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const actualizarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ message: "Estudiante actualizado", estudiante });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findByIdAndDelete(req.params.id);
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });
    res.json({ message: "Estudiante eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
