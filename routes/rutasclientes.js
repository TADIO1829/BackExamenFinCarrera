import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  crearCliente,
  obtenerClientes,
  obtenerCliente,
  obtenerClienteCedula,
  actualizarCliente,
  eliminarCliente
} from "../controllers/clientecontroller.js";

const router = express.Router();

router.use(verifyToken);

router.post("/", crearCliente);
router.get("/", obtenerClientes);
router.get("/:id", obtenerCliente);
router.get("/cedula/:cedula", obtenerClienteCedula);
router.put("/:id", actualizarCliente);
router.delete("/:id", eliminarCliente);

export default router;
