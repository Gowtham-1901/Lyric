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
    const result = await pool.query("SELECT * FROM userinformation");
    console.log(result);
    res.status(200).json(result.rows);
})

app.put('/updateuserdata/:id',async(req,res)=>{
    const {id,role}=req.body;
    console.log(req.body)
    try{
        await pool.query("UPDATE userinformation SET role = $1 WHERE id = $2",[role,id]);
        res.status(200).json({message: 'Updated'})
    }catch(err){
        res.status(404).json({error: 'ID not found'})
    }
})


app.delete('/deleteuserdata',async(req,res)=>{
    const {id}=req.body
    {console.log(id)}
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


module.exports= app;