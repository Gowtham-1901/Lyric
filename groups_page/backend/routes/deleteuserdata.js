/*jslint es6 */
/* jslint node */
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// deleting a particular user
router.delete('/deleteuserdata', async (req, res) => {
    const {id} = req.body
    try{
        const result = await pool.query("UPDATE user_table SET isactive = false  WHERE id = $1", [id]);
        console.log(result.rowCount)
        if(result.rowCount == 1)
            res.status(200).json('Data Deleted');
        else
            throw new Error('id does not exists');
    } catch(err){
        res.status(404).json(err.message);
    }
});

module.exports = router;