require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use("/images", express.static("public/images"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo conectado"))
  .catch(err => console.log(err));

// rutas
app.use('/api/games', require('./routes/games.routes'));
app.use("/api/auth", require("./routes/auth.routes"));
app.use('/api/tareas', require('./routes/tareas.routes'));

// middleware de errores
const errorMiddleware = require("./middlewares/errorMiddleware");
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});
