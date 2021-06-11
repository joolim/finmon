const express = require('express');
const cors = require('cors');
const database = require('./database');
const login = require('./router/login');
const wishlist = require('./router/wishlist');

const app = express();
app.use(express.json());
app.use(cors());

const db = database.callDatabase

// middleware to talk between login form and sql database
app.use(login.router);

// middleware to obtain data for specific id
// middleware to post new wishlist to myql
// middleware to update wishlist to myql
// middleware to delete wishlist from mysql

app.use(wishlist.router);


app.listen(3001,(err)=>{
    err? console.log(error) : console.log("backend port open at 3001")
})