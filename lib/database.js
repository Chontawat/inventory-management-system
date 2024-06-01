const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql2');

app.use(cors());
app.use(bodyparser.json());

//check database
const db = mysql.createConnection({
    host: process.env?.DB_HOST,
    user: process.env?.DB_USER,
    password: process.env?.DB_PASSWORD,
    database: process.env?.DB_NAME,
    port: process.env?.DB_PORT
});

//check database connection
db.connect(err => {
    if (err) {
        console.log('logging host > ' + process.env?.DB_HOST);
        console.log('logging user > ' + process.env?.DB_USER);
        console.log('logging password > ' + process.env?.DB_PASSWORD);
        console.log('logging database > ' + process.env?.DB_NAME);
        console.log('logging port > ' + process.env?.DB_PORT);
        console.log(err, 'dberr');
    } else {
        console.log('database connected...');
    }
})
// INNER JOIN dealer on product.dealer_id=dealer.dealer_id INNER JOIN type_of_product on product.Tproduct_id=type_of_product.Tproduct_id

//product
//get all data
app.get('/product',(req,res)=>{
    let qr = 'select * from product INNER JOIN dealer on product.dealer_id=dealer.dealer_id INNER JOIN type_of_product on product.Tproduct_id=type_of_product.Tproduct_id';
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all product data get',
                data: result
            });
        }
    });
    console.log('get all product data');
});
//test single data product_id
app.get('/product/:product_id',(req,res)=>{
    let gID = req.params.product_id;
    let qr = 'select * from product where product_id = '+ gID ;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single data',
                data: result
            });
        } else{
            res.send({
                message: 'data not found'
            });
        }
    });
    console.log('get product_id',req.params.product_id,'completed')
});
//create data ใช้ get ใน postman
app.post('/product',(req,res)=>{
    console.log(req.body,'create data');
    
    let Pid = req.body.product_id;
    let Pname = req.body.product_name;
    let Tproduct = req.body.Tproduct_id;
    let dealerId = req.body.dealer_id;
    let price = req.body.price;
    let cUnit = req.body.c_unit;


    let qr = "insert into product(product_id,product_name,Tproduct_id,dealer_id,price,c_unit) values('"+Pid+"','"+Pname+"','"+Tproduct+"','"+dealerId+"','"+price+"','"+cUnit+"')";
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result,'result')
        res.send({
            message : 'data insert'
        });
        
    });
});
//update data ใช้ put ใน postman
app.put('/product/:product_id',(req,res)=>{
    console.log(req.body,'updatedata');

    let pID = req.params.product_id; //ส่ง id เข้าไป

    let Pname = req.body.product_name;
    let Tproduct = req.body.Tproduct_id;
    let dealerId = req.body.dealer_id;
    let price = req.body.price;
    let cUnit = req.body.c_unit;

    let qr = "update product set product_name='"+Pname+"', Tproduct_id='"+Tproduct+"', dealer_id='"+dealerId+"', price='"+price+"', c_unit='"+cUnit+"' where product_id ="+pID;
    console.log(qr);
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       console.log(result,'result');
        res.send({
            message:'data update',
        });
    });
});
//delete data ใช้ delete ใน postman
app.delete('/product/:product_id',(req,res)=>{
    let pID = req.params.product_id;
    let qr = 'delete from product where product_id = '+pID;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       //console.log(result,'result');
        res.send({
            message:'data delete',
        });
    });
})
    

//employee
//get all employee data
app.get('/employee',(req,res)=>{
    let emp = 'select * from employee';
    db.query(emp,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all employee data',
                emp_data: result
            });
        }
    });
    console.log('get all employee data');
});
//test single data employee_id
app.get('/employee/:employee_id',(req,res)=>{
    let empID = req.params.employee_id;
    let qr = 'select * from employee where employee_id = '+ empID;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single employee data',
                emp_data: result
            });
        } else{
            res.send({
                message: 'employee data not found'
            });
        }
    });
    console.log('get employee_id',req.params.employee_id,'completed')
});
//create employee data ใช้ get ใน postman
app.post('/employee',(req,res)=>{
    console.log(req.body,'create employee data');
    
    let Eid = req.body.employee_id;
    let Ename = req.body.employee_name;
    let EAddress = req.body.address;
    let ETel = req.body.tel;

    let qr = "insert into employee(employee_id,employee_name,address,tel) values('"+Eid+"','"+Ename+"','"+EAddress+"','"+ETel+"')";
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result,'result')
        res.send({
            message : 'employee data insert'
        });
        
    });
});
//update employee data ใช้ put ใน postman
app.put('/employee/:employee_id',(req,res)=>{
    console.log(req.body,'updatedata');

    let empID = req.params.employee_id; //ส่ง id เข้าไป
    let Ename = req.body.employee_name;
    let EAddress = req.body.address;
    let ETel = req.body.tel;

    let qr = "update employee set employee_name='"+Ename+"', address='"+EAddress+"', tel='"+ETel+"' where employee_id ="+empID;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       console.log(result,'result');
        res.send({
            message:'employee data update',
        });
    });
});
//delete employee data ใช้ delete ใน postman
app.delete('/employee/:employee_id',(req,res)=>{
    let empID = req.params.employee_id;
    let qr = 'delete from employee where employee_id = '+empID;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       //console.log(result,'result');
        res.send({
            message:'data delete',
        });
    });
})


//dealer
//get all dealer data
app.get('/dealer',(req,res)=>{
    let emp = 'select * from dealer';
    db.query(emp,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all dealer data',
                deal_data: result
            });
        }
    });
    console.log('get all dealer data');
});
//get single dealer data
app.get('/dealer/:dealer_id',(req,res)=>{
    let dealer_ID = req.params.dealer_id;
    let qr = 'select * from dealer where dealer_id = '+ dealer_ID;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single dealer_id data',
                deal_data: result
            });
        } else{
            res.send({
                message: 'dealer_id data not found'
            });
        }
    });
    console.log('get dealer_id',req.params.dealer_id,'completed')
});
//create dealer data ใช้ get ใน postman
app.post('/dealer',(req,res)=>{
    console.log(req.body,'create dealer data');
    
    let d_ID = req.body.dealer_id;
    let d_NAME = req.body.dealer_name;
    let Address = req.body.address;
    let Tel = req.body.tel;
    

    let qr = "insert into dealer(dealer_id,dealer_name,address,tel) values('"+d_ID+"','"+d_NAME+"','"+Address+"','"+Tel+"')";
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err, "Please fix your dealer Database");
        }
        console.log(result,'result')
        res.send({
            message : 'dealer data insert'
        });
        
    });
});
//update dealer data
app.put('/dealer/:dealer_id',(req,res)=>{
    console.log(req.body,'update dealer data');

    let d_ID = req.params.dealer_id; //ส่ง id เข้าไป
    let d_Name = req.body.dealer_name;
    let Address = req.body.address;
    let Tel = req.body.tel;


    let qr = "update dealer set dealer_name='"+d_Name+"', address='"+Address+"', tel='"+Tel+"' where dealer_id =" + d_ID;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       console.log(result,'result');
        res.send({
            message:'dealer data update',
        });
    });
});
//delete dealer data ใช้ delete ใน postman
app.delete('/dealer/:dealer_id',(req,res)=>{
    let dealer_ID = req.params.dealer_id;
    let qr = 'delete from dealer where dealer_id = '+ dealer_ID;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
       //console.log(result,'result');
        res.send({
            message:'dealer data delete',
        });
    });
})


//import_product
//get all import_product data
app.get('/import_product',(req,res)=>{
    let emp = 'select * from import_product INNER JOIN employee on import_product.employee_id=employee.employee_id INNER JOIN dealer on import_product.dealer_id=dealer.dealer_id INNER JOIN type_of_product on import_product.Tproduct_id=type_of_product.Tproduct_id';
    db.query(emp,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all import_product data',
                import_product_data: result
            });
        }
    });
    console.log('get all import_product data');
});
//single data import_product
app.get('/import_product/:import_id',(req,res)=>{
    let im_pro_ID = req.params.import_id;
    let qr = 'select * from import_product where import_id = '+ im_pro_ID;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single import_product data',
                import_product_data: result
            });
        } else{
            res.send({
                message: 'import_product data not found'
            });
        }
    });
    console.log('get import_product_id',req.params.import_id,'completed')
});
//create import_product data ใช้ get ใน postman
app.post('/import_product',(req,res)=>{
    console.log(req.body,'create import_product data');
    
    let imp_pID = req.body.import_id;
    let im_pro_id = req.body.product_id;
    let pro_name = req.body.product_name;
    let T_pro = req.body.Tproduct_id;
    let emp_id = req.body.employee_id;
    let dealer_id = req.body.dealer_id;
    let DO_IM = req.body.date_of_import;
    let DO_T = req.body.date_of_transport;
    let amount = req.body.amount;
    let price = req.body.price; 
    let total  = req.body.total;

    let qr = "insert into import_product(import_id,product_id,product_name,Tproduct_id,employee_id,dealer_id,date_of_import,date_of_transport,amount,price,total) values('"+imp_pID+"','"+im_pro_id+"','"+pro_name+"','"+T_pro+"','"+emp_id+"','"+dealer_id+"','"+DO_IM+"','"+DO_T+"','"+amount+"','"+price+"','"+total+"')";
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err, "Please fix yor Database");
        }
        console.log(result,'result')
        res.send({
            message : 'import_product data insert'
        });
        
    });
});
//update import_product data
app.put('/import_product/:import_id',(req,res)=>{
    console.log(req.body,'updatedata');

    let imp_pID = req.params.import_id; //ส่ง id เข้าไป
    let im_pro_id = req.body.product_id;
    let pro_name = req.body.product_name;
    let emp_id = req.body.employee_id;
    let dealer_id = req.body.dealer_id;
    let DO_IM = req.body.date_of_import;
    let DO_T = req.body.date_of_transport;
    let amount = req.body.amount;
    let price = req.body.price;
    let total = req.body.total;


    let qr = "update import_product set product_id='"+im_pro_id+"', product_name='"+pro_name+"', employee_id='"+emp_id+"', dealer_id='"+dealer_id+"', date_of_import='"+DO_IM+"' , date_of_transport='"+DO_T+"' , amount='"+amount+"' , price='"+price+"' , total='"+total+"'  where import_id =" +imp_pID ;
    db.query(qr,['received'],(err,result)=>{
        if(err){console.log(err);}
       console.log(result,'result');
        res.send({
            message:'import product data update',
        });
    });
});


//picking-system data
//get all picking-system data
app.get('/picking_product',(req,res)=>{
    let emp = 'select * from picking_product INNER JOIN employee on picking_product.employee_id=employee.employee_id INNER JOIN product on picking_product.product_id=product.product_id';
    db.query(emp,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all picking_product data get',
                picking_product_data: result
            });
        }
    });
    console.log('get all picking_product_data');
});
//create picking_product data ใช้ get ใน postman
app.post('/picking_product',(req,res)=>{
    console.log(req.body,'create picking_product data');
    
    let picking_ID = req.body.picking_id;
    let lot_id = req.body.lot_id;
    let pro_id = req.body.product_id;
    let pro_name = req.body.product_name;
    let emp_id = req.body.employee_id;
    let date_picking = req.body.date_of_picking;
    let picking_amount = req.body.amount_of_picking;
    let price = req.body.price; 
    let total  = req.body.total;

    let qr = "insert into picking_product(picking_id,lot_id,product_id,product_name,employee_id,date_of_picking,amount_of_picking,price,total) values('"+picking_ID+"','"+lot_id+"','"+pro_id+"','"+pro_name+"','"+emp_id+"','"+date_picking+"','"+picking_amount+"','"+price+"','"+total+"')";
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err, "Please fix yor table in Database");
        }
        console.log(result,'result')
        res.send({
            message : 'picking_product data insert'
        });
        
    });
});





//product-lot data ล็อตสินค้า
//get all product-lot data
app.get('/product_lot',(req,res)=>{
    let p_lot = 'select * from product_lot INNER JOIN product on product.product_id=product_lot.product_id';
    db.query(p_lot,(err, result) => {
        if (err) {
            console.log(err, 'errors'); 
        } if (result.length > 0) {
            res.send({
                message: 'all product_lot data get',
                product_lot_data: result
            });
        }
    });
    console.log('get all product_lot data');
});

//get single product_lot data
app.get('/product_lot/:lot_id',(req,res)=>{
    let prod_lot_id = req.params.lot_id;
    let qr = 'select * from product_lot where lot_id = '+ prod_lot_id;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single product_lot data',
                product_lot_data: result
            });
        } else{
            res.send({
                message: 'product_lot data not found'
            });
        }
    });
    console.log('get lot_id',req.params.lot_id,'completed')
});

//insert product lot data
app.post('/product_lot', (req, res) => {
    const { lot_id, product_id, production_date, expiration_date, taken_date, product_total, product_remain, price_total } = req.body;
  
    // SQL query to insert a new record
    const sql = 'INSERT product_lot (lot_id, product_id, production_date, expiration_date, taken_date, product_total, product_remain, price_total) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [lot_id, product_id, production_date, expiration_date, taken_date, product_total, product_remain, price_total];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      res.status(201).json({ message: 'Record added successfully', result: result.lot_id });
    });
  });

//update product_lot data
// app.put('/product_lot/:lot_id', (req, res) => {
//     const { lot_id } = req.params;
//     const { product_id, production_date, expiration_date, taken_date, product_total, product_remain, price_total } = req.body;
  
//     // SQL query to update the record
//     const sql = 'UPDATE product_lot SET product_id = ?, production_date = ?, expiration_date = ?, taken_date = ?, product_total = ?, product_remain = ?, price_total = ? WHERE lot_id = ?';
//     const values = [product_id, production_date, expiration_date, taken_date, product_total, product_remain, price_total, lot_id];
  
//     db.query(sql, values, (err, result) => {
//       if (err) {
//         console.error('Error executing query:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//         return;
//       }
  
//       if (result.affectedRows === 0) {
//         res.status(404).json({ message: 'Record not found' });
//         return;
//       }
  
//       res.json({ message: 'Product_lot Record updated successfully' });
//     });
//   });

  //เบิกสินค้า
  app.put('/product_lot/:lot_id', (req, res) => {
    let newQuantity = req.body.product_remain;
    let sql = `UPDATE product_lot SET product_remain = product_remain - ${newQuantity} WHERE lot_id = ${req.params.lot_id}`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      let updatedSql = `SELECT product_remain FROM product_lot WHERE lot_id = ${req.params.lot_id}`;
      db.query(updatedSql, (err, updatedResult) => {
        if (err) throw err;
        res.send({ remainingStock: updatedResult[0].product_remain });
      });
    });
  });

//single product_lot data 
app.get('/product_lot/:lot_id',(req,res)=>{
    let Lotid = req.params.lot_id;
    let qr = 'select * from product_lot where lot_id = '+ Lotid;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get single product_lot data',
                import_product_data: result
            });
        } else{
            res.send({
                message: 'product_lot data not found'
            });
        }
    });
    console.log('get lot_id',req.params.lot_id,'completed')
});

app.get('/type_of_product',(req,res)=>{
    let qr = 'select * from type_of_product';
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err, 'errors');
        } if (result.length > 0) {
            res.send({
                message: 'all type_of_product data get',
                type_of_product_data: result
            });
        }
    });
    console.log('get all type_of_product data');
});
//test single data product_id
app.get('/type_of_product/:Tproduct_id',(req,res)=>{
    let TID = req.params.Tproduct_id;
    let qr = 'select * from type_of_product where Tproduct_id = '+ TID ;
    db.query(qr,(err, result) => {
        if (err) {
            console.log(err);
        } if (result.length > 0) {
            res.send({
                message: 'get type_of_product single data',
                type_of_product_data: result
            });
        } else{
            res.send({
                message: 'type_of_product data not found'
            });
        }
    });
    console.log('get type_of_product id ',req.params.Tproduct_id,' completed')
});





app.listen(3500, ()=>{
    console.log('server running.');
});