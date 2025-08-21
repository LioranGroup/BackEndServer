const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const usersRoutes = require('./Routes/Users');
const ordersRoutes = require('./Routes/orders');
const inputsRoutes = require('./Routes/inputs');
const Auth = require('./Models/auth');
const menuRoutes = require('./Routes/menu');







app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando localmente');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});



app.use('/api/users',Auth, usersRoutes);

app.use('/api/orders',Auth, ordersRoutes);

app.use('/api/inputs', Auth, inputsRoutes);

app.use('/api/menu', Auth, menuRoutes);



//***************************************PRUEBA SERVIDOR FRONT END
app.post('/test', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend' });
});

app.get('/saludo/:nombre', (req, res) => {
  res.send(`Hola, ${req.params.nombre}!`);
});

app.get('/saludo', (req, res) => {
  res.send(`Hola, ${req.query.nombre}!`);
});

//***************************************

db.serialize(() => {
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, row, res) => {
    if (err) {
      console.error('Error al listar tablas:', err.message);
    } else {
      console.log(`Tabla encontrada: ${row.name}`);
    }
  });
});

