const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// getting datas from backend

router.get('/getsubcategory', async(req,res) => {
    const result = await pool.query("SELECT id,sub_category FROM transdict");
    res.status(200).json(result.rows);
});

module.exports = router;