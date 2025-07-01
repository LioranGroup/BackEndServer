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

module.exports = router;
