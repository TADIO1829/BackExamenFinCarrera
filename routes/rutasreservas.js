import express from "express";
import { verifyToken } from "../middleware/auth.js";

import { crearReserva,
  registroReserva,
  obtenerReservas,
  obtenerReserva,
  actualizarReserva,
  eliminarReserva
 } from "../controllers/reservacontroller.js";
const router = express.Router();

router.use(verifyToken);

router.post("/", registroReserva);
router.post("/crear", crearReserva);
router.get("/", obtenerReservas);
router.get("/:id", obtenerReserva);
router.put("/:id", actualizarReserva);
router.delete("/:id", eliminarReserva);

export default router;
