import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  crearMatricula,
  obtenerMatriculas,
  obtenerMatricula,
  actualizarMatricula,
  eliminarMatricula,
  obtenerMatriculasEstudiante
} from "../controllers/matriculacontroller.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", crearMatricula);
router.get("/", obtenerMatriculas);
router.get("/:id", obtenerMatricula);
router.put("/:id", actualizarMatricula);
router.delete("/:id", eliminarMatricula);
router.get("/estudiante/:cedula", obtenerMatriculasEstudiante);

export default router;
