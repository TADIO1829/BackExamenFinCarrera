import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  crearEstudiante,
  obtenerEstudiantes,
  obtenerEstudiante,
  obtenerEstudianteCedula,
  actualizarEstudiante,
  eliminarEstudiante
} from "../controllers/estudiantecontroller.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", crearEstudiante);
router.get("/", obtenerEstudiantes);
router.get("/:id", obtenerEstudiante);
router.get("/cedula/:cedula", obtenerEstudianteCedula);
router.put("/:id", actualizarEstudiante);
router.delete("/:id", eliminarEstudiante);

export default router;
