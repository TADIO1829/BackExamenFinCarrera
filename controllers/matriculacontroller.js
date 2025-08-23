import Matricula from "../models/Matricula.js";
import Estudiante from "../models/Estudiantes.js";
import Materia from "../models/Materias.js";

export const crearMatricula = async (req, res) => {
  try {
    const { estudianteCedula, materias } = req.body;
    const estudiante = await Estudiante.findOne({ cedula: estudianteCedula });
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });

    const materiaIds = [];
    const materiasInfo = [];
    const codigos = Array.isArray(materias) ? materias : [materias];

    for (let codigo of codigos) {
      const materia = await Materia.findOne({ codigo });
      if (materia) {
        materiaIds.push(materia._id);
        materiasInfo.push({
          nombre: materia.nombre,
          codigo: materia.codigo,
          creditos: materia.creditos
        });
      }
    }

    if (materiaIds.length === 0)
      return res.status(400).json({ error: "No se encontraron materias válidas" });

    const matricula = new Matricula({ 
      estudiante: estudiante._id, 
      materias: materiaIds,
      materiasInfo
    });

    await matricula.save();

    res.json({ message: "Matrícula creada exitosamente", matricula });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const obtenerMatriculas = async (req, res) => {
  try {
    const matriculas = await Matricula.find()
      .populate("estudiante", "nombre apellido cedula")
      .populate("materias", "nombre codigo creditos");
    res.json(matriculas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findById(req.params.id)
      .populate("estudiante", "nombre apellido cedula")
      .populate("materias", "nombre codigo creditos");
    if (!matricula) return res.status(404).json({ error: "Matrícula no encontrada" });
    res.json(matricula);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerMatriculasEstudiante = async (req, res) => {
  try {
    const estudiante = await Estudiante.findOne({ cedula: req.params.cedula });
    if (!estudiante) return res.status(404).json({ error: "Estudiante no encontrado" });

    const matriculas = await Matricula.find({ estudiante: estudiante._id })
      .populate("materias", "nombre codigo creditos");

    res.json({ estudiante: estudiante.nombre, matriculas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const actualizarMatricula = async (req, res) => {
  try {
    const { materias } = req.body;
    let updateData = { ...req.body };

    if (materias) {
      const materiaIds = [];
      for (let codigo of materias) {
        const materia = await Materia.findOne({ codigo });
        if (materia) materiaIds.push(materia._id);
      }
      updateData.materias = materiaIds;
    }

    const matricula = await Matricula.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("estudiante", "nombre apellido cedula")
      .populate("materias", "nombre codigo creditos");

    if (!matricula) return res.status(404).json({ error: "Matrícula no encontrada" });

    res.json({ message: "Matrícula actualizada", matricula });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarMatricula = async (req, res) => {
  try {
    const matricula = await Matricula.findByIdAndDelete(req.params.id);
    if (!matricula) return res.status(404).json({ error: "Matrícula no encontrada" });
    res.json({ message: "Matrícula eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
