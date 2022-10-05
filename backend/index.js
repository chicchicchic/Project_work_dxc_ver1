const { json } = require('express')
const express = require('express')
const mysql = require('mysql')

const app = express()

// Create connetion to database (mysql workbench)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root123",
    database: "food"
});

// db.connect(function(err) {
//     if(err) 
//     {
//         console.log(err)
//     }else {
//         console.log("connected");
//     }
// })

app.use(express.json())

// [GET] Get a test string 'hello khanh'
app.get("/", (req, res)=>{
    res.json("helloo Khanh")
})

// [GET] Get all data in table 'fooditem'
app.get("/foods", (req, res)=>{
    var q = "SELECT * FROM fooditem"
    db.query(q, (err, data)=> {
        if(err) return res.json(err) 
        return res.json(data)
    })
})

// [POST] Create an item into table "fooditem"
app.post("/foods", (req, res)=> {
    const q = "INSERT INTO fooditem (`title`, `desc`, `imgSource`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.imgSource,
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err) 
        return res.json("food has been create succesfully")
    })
})

app.listen(8800, ()=> {
    console.log("Connected to backend!")
})