/* jslint es6 */
/* jslint node */
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Changing the datas
router.put('/updateuserdata/:id', async (req, res) => {
    const {id, role} = req.body;
    console.log(req.body)
    try{
        const result = await pool.query("UPDATE userinformation SET role = $1 WHERE id = $2", [role, id]);
        console.log(result.rowCount);
        if(result.rowCount == 1)
            res.status(200).json('Data Updated');
        else
            throw new Error('id does not exists');
    } catch(err){
        res.status(404).json(err.message);
    }
});

module.exports = router;