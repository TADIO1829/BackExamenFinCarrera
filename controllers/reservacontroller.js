
import Vehiculo from "../models/Vehiculo.js";
import Reserva from "../models/Reserva.js";
import Clientes from "../models/Clientes.js"; 

export const crearReserva = async (req, res) => {
  try {
    const { codigo,descripcion,cliente, vehiculos } = req.body;
    if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
    const clienteDoc = await Clientes.findById(cliente);
    if (!clienteDoc) return res.status(404).json({ error: "Cliente no encontrado" });

    const vehiculoDocs = await Vehiculo.find({ _id: { $in: vehiculos } });
    if (!vehiculoDocs.length) return res.status(400).json({ error: "No se encontraron vehículos válidos" });

    const vehiculosInfo = vehiculoDocs.map(v => ({
      marca: v.marca,
      modelo: v.modelo,
      codigo: v.codigo
    }));

    const reserva = new Reserva({
      codigo:codigo,
      descripcion:descripcion,
      cliente: clienteDoc._id,
      vehiculos: vehiculoDocs.map(v => v._id),
      vehiculosInfo
    });

    await reserva.save();

    res.json({ message: "Reserva creada exitosamente", reserva });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const obtenerReservas = async (req, res) => {
  try {
    const reserva = await Reserva.find();
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(reserva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarReserva= async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva actualizada", reserva });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
