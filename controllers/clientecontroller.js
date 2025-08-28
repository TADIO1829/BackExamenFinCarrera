
import Clientes from "../models/Clientes.js";

export const crearCliente= async (req, res) => {
  try {
    const { nombre, apellido, cedula, email, telefono, ciudad, direccion, fecha_nacimiento } = req.body;

    const existing = await Clientes.findOne({ $or: [{ cedula }, { email }] });
    if (existing) return res.status(400).json({ error: "Cédula o email ya registrado" });

    const cliente = new Clientes({ nombre, apellido, cedula, email, telefono, ciudad, direccion, fecha_nacimiento });
    await cliente.save();

    res.json({ message: "Cliente creado exitosamente", cliente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const obtenerClienteCedula = async (req, res) => {
  try {
    const cliente = await Clientes.findOne({ cedula: req.params.cedula });
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json({ message: "Cliente actualizado", cliente });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente no encontrado" });
    res.json({ message: "Cliente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
