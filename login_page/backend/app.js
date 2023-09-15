const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());
// const port = 3001;
const cors = require('cors')
app.use(cors());

// const authenticate = require('./auth'); 

app.get('/',(req,res)=>{
    res.json('Backend is working !!!');
})


// admin

app.get('/data', async(req,res) => {
    const result = await pool.query("SELECT * FROM datas",(error,result) => {
        // if(error) throw error;
        res.status(200).json(result.rows);
    })
})



app.post("/createUser", async(req,res) => {
    const {username,password,id}=req.body;
    try{
    await pool.query("INSERT INTO datas (username, password, id) VALUES($1,$2,$3)", [username, password,id])
    res.status(201).json({message: 'Data Created!'})
    }
    catch(err){
        res.status(400).json({error: 'value too long for the field'})
    }
})


app.put("/updateUser",async(req,res) => {
    const {username,id}=req.body;
    try{
        await pool.query("UPDATE datas SET username=$1 WHERE id=$2 ", [username,id])
        res.status(200).json({message: 'Updated'})
    }
    catch(err){
        res.status(400).json({error: 'value too long for the field'})
    }
})

app.delete("/removeUser", async(req,res) => {
    const {id} = req.body;
    try{
        const result = await pool.query("DELETE FROM datas WHERE id=$1",[id])
        console.log(res.rowCount)
        if(result.rowCount == 1)
            res.status(200).json('Data Deleted');
        else
            throw new Error("Id not exist");       
    }catch(err){
        res.status(404).json(err.message);
    }
})



app.post('/authData', async(req,res) => {
    const {username,password} = req.body;
    console.log(username,password);

    try{
        const query = 'SELECT * FROM datas WHERE username=$1 AND password=$2';
        const values = [username,password];
        const result = await pool.query(query,values);
        console.log(req.body)

        if(result.rowCount === 1){
            res.status(200).json({message: 'Login successful!'});
        }
        else{
            throw new Error("An error occured");
        }
    }
        catch(err){ 
            console.log(err);
            res.status(401).json(err.message);
        }
    }
)


    // const results = await Pool.query("INSERT INTO datas (username,password) values ($1,$2)", [username,password],(error,results) => {
    //     if(error) throw error;
    //     res.status(201),send("added");
    // })

    module.exports = app;