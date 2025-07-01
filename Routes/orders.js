//routes/orders.js
const express = require('express');
const router = express.Router();
const orders = require('../Models/orders');


router.post('/new', (req, res)=>
    {
        
        const {Item, Qty, Date, Order, Table} = req.body;

        if (!Item | !Qty | !Date | !Order | !Table)
        {
            return res.status(400).json({error: "Te faltan valores para continuar"})
        }
         
    

        orders.newOrder(Item, Qty, Date, (err,data)=>
            {
                if (err) return res.status(500).json({error: err.message})
                res.status(201).json({data})
            });
            
    });



router.get('/all', (req, res)=>{

    orders.getAll((err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(data);
  });
  
  
});

router.get('/specific', (req, res)=> {
    const {id} = req.query;
    if (!id){
        return res.status(400).json({error: "No tienes lo necesario para esta consulta"})
    };

    orders.getById(id, (err,data)=>{
        if (err) return res.status(500).json({ error: err.message });
    res.json(data);
    });
})
module.exports = router;