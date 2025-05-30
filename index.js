const cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;



app.use(cors({
  origin: 'http://localhost:4200'
}));


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando localmente');
});

app.get('/saludo/:nombre', (req, res) => {
  res.send(`Hola, ${req.params.nombre}!`);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

//PRUEBA SERVIDOR FRONT END
app.get('/api/ejemplo', (req, res) => {
  res.json({ mensaje: 'Hola desde el backend' });
});


db.serialize(() => {
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
    if (err) {
      console.error('Error al listar tablas:', err.message);
    } else {
      console.log(`Tabla encontrada: ${row.name}`);
    }
  });
});

