// routes/users.js
const express = require('express');
const router = express.Router();
const users = require('../Models/Users')

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos de login' });
  }

  users.login(username, password, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  });
});

router.get('/consulte', (req, res) => {
    const {variable} = req.body;
    if (variable != "ServiceCheck"){
        return res.status(400).json({error: "No tienes lo necesario para esta consulta"})
    }

    users.getAll(variable, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
});

module.exports = router;
