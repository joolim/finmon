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
    [child_id],
    (err,result)=>{
            err ? console.log(err) : console.log("success"); res.send(result)
        }
    )
})





app.listen(3001,(err)=>{
    err? console.log(error) : console.log("backend port open at 3001")
})