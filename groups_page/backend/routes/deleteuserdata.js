/*jslint es6 */
/* jslint node */
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// deleting a particular user
router.delete('/deleteuserdata', async (req, res) => {
    const {role_id} = req.body
    console.log(id)
    try{
        const result = await pool.query("DELETE FROM userinformation WHERE role_id=$1", [role_id]);
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