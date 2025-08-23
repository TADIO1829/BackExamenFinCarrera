import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Registro
export const register = async (req, res) => {
  let { nombre, apellido, email, password } = req.body;

  try {
    email = email.toLowerCase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      apellido,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      message: "Usuario registrado exitosamente",
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

   
    const token = jwt.sign(
      { id: user._id, nombre: user.nombre, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
    );

    
    res.json({
      message: `Bienvenido ${user.nombre}`,
      token, 
      user: {
        id: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};