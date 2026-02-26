const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// La función que me pediste con la lógica de búsqueda correcta
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1. BUSCAR al usuario específico por su nombre
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Usuario no encontrado" 
      });
    }

    // 2. VERIFICAR si la contraseña le pertenece a este usuario
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ 
        success: false, 
        message: "Contraseña incorrecta" 
      });
    }

    // 3. Generar el token con el ROL específico (admin o user)
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      success: true,
      username: user.username, 
      role: user.role, 
      token 
    });

  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ¡ESTA LÍNEA ES LA MÁS IMPORTANTE PARA QUE NO TE SALGA EL TYPEERROR!
module.exports = { login };