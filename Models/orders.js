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
            callback(null, row); 
          } else 
            {
              callback(null, "The order doesn't exist"); 
            }
        });},

  newOrder(Item,Qty,Date,Table,Order, callback){

    
    const crearOrden = `INSERT INTO orders (order_date, order_status, table_id) VALUES (?, 'open',?)`;
    

    db.run(crearOrden, [Date, Table], function (err)
    {
      if (err) return callback(err);
      const newOrderId = this.lastID;
      const query = `
                  INSERT INTO orders_items (order_id, dish_id, quantity, price_at_sale, table_id)
                  SELECT ?,m.dish_id, ?, m.unit_price * ?, ?
                  FROM menu m
                  WHERE m.dish_name = ?;
      `;
      db.run(query,[newOrderId,Qty,Qty,Table,Item], function (err)
      {
        if (err) 
        {
          console.error(err);
          return callback({ err});
        }

        callback(null,{ success: true, message: 'La orden ha sido creada satisfactoriamente', orderId: newOrderId });
      });
    });},


  newItem(Item, Qty, Date, Order, Table, callback){
    const findOrder = `SELECT *
      FROM view_order_history
      WHERE order_id = ? AND table_id = ?;`;

    const addItem = `
      INSERT INTO orders_items (order_id, dish_id, quantity, price_at_sale, table_id)
      SELECT ?, m.dish_id, ?, m.unit_price * ?, ?
      FROM menu m
      WHERE m.dish_name = ?;
    `;  

    db.get(findOrder, [Order, Table], function (err, row)
    {
      // console.log(row.order_status);
      if (err) return callback(err);
      if (!row  || row.order_status === 'closed' ){
         callback(null,{  message: "No se encontró ningún registro o la orden ya esta cerrada" });
      }else{
        // callback(null,{ message: 'esta es la orden', row });
        const newOrderId = this.lastID;
        db.run(addItem,[Order,Qty,Qty,Table,Item], function (err)
      {
        if (err) 
        {
          console.error(err);
          return callback({ err});
        }

        callback(null,{ success: true, message: 'La orden ha sido agregada satisfactoriamente', orderId: newOrderId });
      });}

    })
  },
  closeOrder(Order, callback){
    const findOrder = `SELECT *
      FROM orders
      WHERE order_id = ?;`;

    const close = `
      UPDATE orders
      SET order_status = 'closed'
      WHERE order_id = ?;
    `;  

    db.get(findOrder, [Order], function (err, row)
    {
      // console.log(row.order_status);
      if (err) return callback(err);
      if (!row  || row.order_status === 'closed' ){
         callback(null,{  message: "No se encontró ningún registro o la orden ya esta cerrada" });
      }else{
        // callback(null,{ message: 'esta es la orden', row });
        
        db.run(close,[Order], function (err)
      {
        if (err) 
        {
          console.error(err);
          return callback({ err});
        }

        callback(null,{ success: true, message: 'La orden ha sido cerrada satisfactoriamente' });
      });}

    })
  }
}



module.exports = orders;