const Pool = require("pg").Pool;
const express= require("express");
const cors= require("cors");
const app= express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}))


const pool = new Pool({
    host: "localhost",
    user:"postgres",
    password:"190401",
    database:"newuserdata",
    port: "5432"
});

app.get('/getuserdata',async(req,res)=>{
    const result=await pool.query("SELECT * FROM userinformation");
    res.status(200).json(result.rows);
})


app.post('/userdata',async(req ,res)=>{
    const {Username,Email,Phone,Password,Language,Role}=req.body;
    try{
        await pool.query(`INSERT INTO userinformation (name,email,phone,password,language,role) VALUES ($1,$2,$3,$4,$5,$6)`,[Username,Email,Phone,Password,Language,Role]);
        res.status(201).json({message: "data is created"})
    }
    catch(err){
        res.status(400).json({error: "Value is too long for the field"})
    }
});


app.delete('/deletedata',async(req,res)=>{
    const {id}=req.body
    try{
        const result = await pool.query("DELETE FROM userinformation WHERE id=$1",[id]);
        console.log(res.rowCount)
        if(result.rowCount == 1)
            res.status(200).json('Data Deleted');
        else
            throw new Error('id does not exists');
    }catch(err){
        res.status(404).json(err.message);
    } 
})


app.put('/editdata',async(req,res)=>{
    const {name,email,phone,language,role,id}=req.body;
    try{
        await pool.query("UPDATE userinformation SET name = $1, email = $2, phone = $3, language = $4, role = $5 WHERE id = $6",[name,email,phone,language,role,id]);
        res.status(200).json({message: 'Updated'})
    }catch(err){
        res.status(400).json({error: 'Too long value'})
    }
})


app.get('/userdetails/:id',async(req,res)=>{
    const id = req.params.id;
    try{
    const result = await pool.query("SELECT * FROM userinformation WHERE id=$1", [id]);
    console.log(res.rowcount);
    if(result.rowCount == 1)
            res.status(200).json('Data Deleted');
        else
            throw new Error('id does not exists');
    } 
    catch(err){
        res.status(404).json(err.message)
    }
})

module.exports= app;