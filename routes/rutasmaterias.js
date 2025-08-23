import express from "express";
import {
  crearMateria,
  obtenerMaterias,
  obtenerMateria,
  actualizarMateria,
  eliminarMateria
} from "../controllers/materiacontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken); 

router.post("/", crearMateria);
router.get("/", obtenerMaterias);
router.get("/:id", obtenerMateria);
router.put("/:id", actualizarMateria);
router.delete("/:id", eliminarMateria);

export default router;
