const express = require('express');
const router =  express.Router();
const menu = require('../Models/menu');

router.get('/all', (req, res)=>
    {
        menu.getAll((err, data) => 
            {
                if (err) return res.status(500).json({ error: err.message });
                res.json(data);
            });
    });

router.get('/specific', (req, res)=> 
    {
        const {id} = req.query;
        if (!id){
            return res.status(400).json({error: "No tienes lo necesario para esta consulta"})
        };
        menu.getById(id, (err,data)=>{
            if (err) return res.status(500).json({ error: err.message });
            res.json(data);
        });
    });

module.exports = router;