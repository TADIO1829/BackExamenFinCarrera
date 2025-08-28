import express from "express";
import {
  crearVehiculo,
  obtenerVehiculos,
  obtenerVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
} from "../controllers/vehiculocontroller.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.use(verifyToken); 

router.post("/", crearVehiculo);
router.get("/", obtenerVehiculos);
router.get("/:id", obtenerVehiculo);
router.put("/:id", actualizarVehiculo);
router.delete("/:id", eliminarVehiculo);

export default router;
