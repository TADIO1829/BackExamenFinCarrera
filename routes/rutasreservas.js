import express from "express";
import { verifyToken } from "../middleware/auth.js";

import { 
  obtenerReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva,
  crearReserva
 } from "../controllers/reservacontroller.js";
const router = express.Router();

router.use(verifyToken);

router.post("/", crearReserva);
router.get("/", obtenerReservas);
router.get("/:id", obtenerReserva);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

export default router;
