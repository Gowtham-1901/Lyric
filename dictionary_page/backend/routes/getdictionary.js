const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// getting datas from backend

router.get('/getdictionary', async(req,res) => {
    const result = await pool.query("SELECT * FROM transdict INNER JOIN user_table ON transdict.user_id = user_table.id INNER JOIN language ON transdict.language_id = language.language_id INNER JOIN role ON role.role_id = transdict.role_id")
    res.status(200).json(result.rows);
});

module.exports = router;