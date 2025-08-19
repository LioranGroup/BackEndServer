const express = require('express');
const router =  express.Router();
const inputs = require('../Models/inputs');

router.get('/all', (req, res)=>
    {
        inputs.getAll((err, data) => 
            {
                if (err) return res.status(500).json({ error: err.message });
                res.json(data);
            });
    });

router.get('/specific', (req, res)=> {
    const {id} = req.query;
    if (!id){
        return res.status(400).json({error: "No tienes lo necesario para esta consulta"})
    };

    inputs.getById(id, (err,data)=>{
        if (err) return res.status(500).json({ error: err.message });
    res.json(data);
    });
});

router.delete('/delete', (req, res) => {
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: "No tienes lo necesario para esta consulta" });
    }
    inputs.deleteById(id, (err, response) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(response);
    });
});

router.post('/newInput', (req, res) => {
    const { Item, Qty, meassure, min } = req.body;

    if (!Item || !Qty || !meassure || !min) {
        return res.status(400).json({ error: "Te faltan valores para continuar" });
    }

    inputs.newInput(Item.toLowerCase().trim(), Qty, meassure, min, (err, response) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(response);
    });
});

module.exports = router;
 