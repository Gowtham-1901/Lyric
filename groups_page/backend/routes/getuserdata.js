/* jslint es6 */
/* jslint node */
const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// getting all the datas
router.get('/getuserdata', async (req, res) => {
    const result = await pool.query("SELECT * FROM user_table JOIN role ON user_table.role_id= role.role_id WHERE isactive = true AND (role.role_id = '1' OR role.role_id = '2')");
    // console.log(result);
    res.status(200).json(result.rows);
});

module.exports = router;