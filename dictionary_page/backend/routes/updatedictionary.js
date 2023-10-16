// const express = require("express");
// const router = express.Router();
// const pool = require("../config/db");

// // cahnging the language

// router.put('/updatelan/:id',async (req, res) => {
//     const {id, lan} = req.body;
//     if(lan == "Tamil"){
//         language_id=1;
//     }
//     if(lan == "English"){
//         language_id=2;
//     }
//     if(lan == "French"){
//         language_id=3;
//     }
//     if(lan == "Hindi"){
//         language_id=4;
//     }
//     try{
//         const result = await pool.query("UPDATE transdict SET language_id= $1 WHERE id = $2", [language_id, id]);
//         if(result.rowCount == 1)
//             res.status(200).json('Language updated');
//         else
//             throw new Error('id does not exist')
//     } catch(err){
//         res.status(404).json(err.message);
//     }
// })