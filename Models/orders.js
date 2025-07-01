const db = require('../db')

const orders = 
{
  getAll(callback){
      db.all("Select * from orders", [], callback);
  }
  
  ,

  getById(id,callback){
    const query = "Select * from orders where order_id = ?";
    db.get(query , [id],(err, row) => 
      {
        if (err) return callback(err);
        if (row) 
          {
            callback(null, row); // Usuario encontrado
          } else 
            {
              callback(null, "The order doesn't exist"); // Usuario no encontrado
            }
        });},

  newOrder(Item,Qty,Date,Table,Order, callback){

    const findOrder = `Select order_id FROM orders_items WHERE order_id = ?`;
    const crearOrden = `INSERT INTO orders (order_date, order_status) VALUES (?, 'open')`;
    const findTable = `Select order_id FROM orders_items WHERE table_id = ?`;

    db.run(crearOrden, [Date], function (err)
    {
      if (err) return callback(err);
      const newOrderId = this.lastID;
      const query = `
                  INSERT INTO orders_items (order_id, dish_id, quantity, price_at_sale)
                  SELECT ?,m.dish_id, ?, m.unit_price * ? 
                  FROM menu m
                  WHERE m.dish_name = ?;
      `;
      db.run(query,[newOrderId,Qty,Qty,Item], function (err)
      {
        if (err) 
        {
          console.error(err);
          return callback({ err});
        }

        callback(null,{ success: true, message: 'La orden ha sido creada satisfactoriamente', orderId: newOrderId });
      });
    });}
}



module.exports = orders;