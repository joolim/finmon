const database = require('../database');
const express = require('express');

const router = express.Router();

const db = database.callDatabase

// backend for Read
const backend_wishlistRead = (req,res) => {
    const child_id = req.body.child_id

    db.query("SELECT * FROM wishlist WHERE child_id = ?", 
    child_id,
    (err,result)=>{
        err ? console.log(err) : console.log("success"); res.send(result)
    })
}
 // backend for Write
const backend_wishlistCreate = (req,res) => {
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
}

// backend for Update
const backend_wishlistUpdate = (req,res) => {
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
}

// backend for Delete
const backend_wishlistDelete = (req,res) => {
    const id = req.params.id

    const deleteSQL = "DELETE FROM wishlist WHERE id = ?";
    db.query(deleteSQL, id, 
    (err,result) => {
        err ? console.log(err) : console.log("delete completed");
    })
}

router.post('/read', backend_wishlistRead);
router.post('/create', backend_wishlistCreate);
router.put('/update',backend_wishlistUpdate);
router.delete('/delete/:id',backend_wishlistDelete);

module.exports = {router}