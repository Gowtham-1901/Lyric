const express = require ("express");
const router = express.Router();
const pool = require("../config/db");

// getting languages from backend

router.get('/getlanguage', async(req,res) => {
    const result = await pool.query("SELECT language_id,language_name FROM language");
    res.status(200).json(result.rows)
})

module.exports = router;