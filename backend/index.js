const express = require('express');
const cors = require('cors');
const database = require('./database');

const app = express();
app.use(express.json());
app.use(cors());

const db = database.callDatabase

// middleware to talk between login form and sql database
app.post('/login', (req,res)=>{
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM child WHERE username = ? AND password = ? ", 
    [username, password],
    (err,result)=>{
        if(err){
            console.log(err);
        }

        if(result.length>0){
            res.send(result);
        } else {
            res.send({message: "hey kids it seems you have put wrong username or password !!"});
        }
    })
})

// middleware to obtain data for specific id
app.post('/read', (req,res)=>{
    const child_id = req.body.child_id

    db.query("SELECT * FROM wishlist WHERE child_id = ?", 
    child_id,
    (err,result)=>{
        err ? console.log(err) : console.log("success"); res.send(result)
    })
})

// middleware to post new wishlist to myql
app.post("/create",(req,res)=>{
    const child_id = req.body.child_id;
    const type = req.body.type;
    const category = req.body.category;
    const item_name = req.body.item_name;
    const price = req.body.price;
    const goal = req.body.goal;

    db.query("INSERT INTO wishlist (child_id,type,category,item_name,price,goal) VALUES (?,?,?,?,?,?)", 
    [child_id,type,category,item_name,price,goal], 
    (err,result) =>{
        err ? console.log(err) : res.send(result);
    })
})

// middleware to update wishlist to myql
app.put("/update",(req,res)=>{
    const id = req.body.id;
    const type = req.body.type;
    const category = req.body.category;
    const item_name = req.body.item_name;
    const price = req.body.price;

    db.query("UPDATE wishlist SET type = ?, category = ?, item_name = ?, price = ? WHERE id = ?",
    [type,category,item_name,price,id],
    (err,result) => {
        err ? console.log(err) : console.log("update completed"); res.send(result);
    })
})

// middleware to delete wishlist from mysql
app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id

    const deleteSQL = "DELETE FROM wishlist WHERE id = ?";
    db.query(deleteSQL, id, 
    (err,result) => {
        err ? console.log(err) : console.log("delete completed");
    })
})



app.listen(3001,(err)=>{
    err? console.log(error) : console.log("backend port open at 3001")
})