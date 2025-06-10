//routes/orders.js
const express = require('express');
const router = express.Router();
const orders = require('../Models/orders')

router.get('/all', (req, res)=>{
    const {order} = req.query;

    if (!order){
        return res.status(400).json({error: "No tienes lo necesario para esta consulta"})
    };

    orders.getAll(order, (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
  
  orders.getById(order, (err,data)=>{
        if (err) return res.status(500).json({ error: err.message });
    res.json(data);
    });
});

module.exports = router;