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
        }

        if(result.length>0){
            res.send(result);
        } else {
            res.send({message: "hey kids it seems you have put wrong username or password !!"});
        }
    })
};

router.post('/login', backend_login);

module.exports = {router}