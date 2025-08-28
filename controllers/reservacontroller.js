
import Vehiculo from "../models/Vehiculo.js";
import Reserva from "../models/Reserva.js";
import Clientes from "../models/Clientes.js"; 

export const crearReserva = async (req, res) => {
  try {
    const { clienteCedula, vehiculo } = req.body;
    const cliente = await Clientes.findOne({ cedula: clienteCedula });
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });

    const vehiculosIds = [];
    const vehiculosInfo = [];
    const codigos = Array.isArray(vehiculos) ? vehiculos : [vehiculos];

    for (let codigo of codigos) {
      const vehiculo = await Vehiculo.findOne({ codigo });
      if (vehiculo) {
        vehiculosIds.push(vehiculo._id);
        vehiculosInfo.push({
          nombre: vehiculo.nombre,
          codigo: vehiculo.codigo,
          creditos: vehiculo.creditos
        });
      }
    }

    if (vehiculosIds.length === 0)
      return res.status(400).json({ error: "No se encontraron vehículos válidos" });

    const reserva = new Reserva({
      cliente: cliente._id,
      vehiculos: vehiculosIds,
      vehiculosInfo
    });

    await reserva.save();

    res.json({ message: "Reserva creada exitosamente", reserva });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registroReserva= async (req,res)=>{
    try {
        const { codigo, descripcion, id_cliente, id_vehiculo } = req.body
        if (Object.values(req.body).includes("")) return res.status(400).json(
            {msg:"Lo sentimos, debes llenar todos los campos"}
        )
        
        const clienteExiste = await Cliente.findById(id_cliente);
        if (!clienteExiste) return res.status(400).json(
            { msg: "El cliente no existe" }
        )
        
        const vehiculoExistente = await Vehiculo.findById(id_vehiculo);
        if (!vehiculoExistente) return res.status(400).json(
            { msg: "El vehiculo no existe" }
        )
        
        const nuevaReserva = new Reserva({
            ...req.body,
            id_cliente: id_cliente,
            id_vehiculo: id_vehiculo
        })
        await nuevaReserva.save()
        res.status(200).json({nuevaReserva})
    } catch (error) {
        if (error.name === 'ValidationError') {
            const msg = Object.values(error.errors)[0].message
        return res.status(400).json({ msg });
        }

        res.status(500).json({ msg: "Error en el servidor" })
    }
    
}


export const obtenerReservas = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id)
      .populate("cliente", "nombre apellido cedula")
      .populate("vehiculos", "marca modelo placa");
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerReserva = async (req, res) => {
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


export const obtenerReservasCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findOne({ cedula: req.params.cedula });
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });

    const reservas = await Reserva.find({ cliente: cliente._id })
      .populate("vehiculos", "nombre codigo creditos");

    res.json({ cliente: cliente.nombre, reservas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const actualizarReserva = async (req, res) => {
  try {
    const { vehiculos } = req.body;
    let updateData = { ...req.body };

    if (vehiculos) {
      const vehiculoIds = [];
      for (let codigo of vehiculos) {
        const vehiculo = await Vehiculo.findOne({ codigo });
        if (vehiculo) vehiculoIds.push(vehiculo._id);
      }
      updateData.vehiculos = vehiculoIds;
    }

    const reserva = await Reserva.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate("cliente", "nombre apellido cedula")
      .populate("vehiculos", "nombre codigo creditos");

    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });

    res.json({ message: "Reserva actualizada", reserva });
  } catch (err) {
    res.status(500).json({ error: err.message });

};
}


export const eliminarReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
