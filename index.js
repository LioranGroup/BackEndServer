
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./DataBase/database.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
  }
});
const express = require('express');
const app = express();
const port = 3000;

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
app.listen('http://localhost:4200',(res)=>{
  res.send('Entregado')
})


db.serialize(() => {
  db.each("SELECT name FROM sqlite_master WHERE type='table'", (err, row) => {
    if (err) {
      console.error('Error al listar tablas:', err.message);
    } else {
      console.log(`Tabla encontrada: ${row.name}`);
    }
  });
});

