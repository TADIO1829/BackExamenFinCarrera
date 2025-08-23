import Materia from "../models/Materias.js";

export const crearMateria = async (req, res) => {
  try {
    const { nombre, codigo, descripcion, creditos } = req.body;
    const existing = await Materia.findOne({ codigo });
    if (existing) return res.status(400).json({ error: "Código ya existe" });

    const materia = new Materia({ nombre, codigo, descripcion, creditos });
    await materia.save();
    res.json({ message: "Materia creada exitosamente", materia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerMaterias = async (req, res) => {
  try {
    const materias = await Materia.find();
    res.json(materias);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const obtenerMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);
    if (!materia) return res.status(404).json({ error: "Materia no encontrada" });
    res.json(materia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const actualizarMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!materia) return res.status(404).json({ error: "Materia no encontrada" });
    res.json({ message: "Materia actualizada", materia });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarMateria = async (req, res) => {
  try {
    const materia = await Materia.findByIdAndDelete(req.params.id);
    if (!materia) return res.status(404).json({ error: "Materia no encontrada" });
    res.json({ message: "Materia eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
