const mysql = require('mysql');

const callDatabase = mysql.createConnection({
    host: '34.126.172.116',
    user: 'root',
    password: 'fintechsglab',
    port: 3306,
    database: 'b10_g7finmon'
});

callDatabase.connect((err)=>{
    err? console.log(err) : console.log("database is connected")
})

module.exports = { callDatabase };