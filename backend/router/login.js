const database = require('../database');
const express = require('express');

const router = express.Router();

const db = database.callDatabase

const backend_login = (req,res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM child WHERE username = ? AND password = ? ", 
    [username, password],
    (err,result)=>{
        if(err){
            console.log(err);
            res.status(500).send("Internal Server Error");

        }

        if(result.length>0){
            res.status(200).send(result);
        } else {
            res.status(200).send({message: "hey kids it seems you have put wrong username or password !!"});
        }
    })
};

router.post('/login', backend_login);

module.exports = {router}