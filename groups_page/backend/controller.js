/*jslint es6 */
/* jslint node */
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const getuserdataRoutes = require("./routes/getuserdata");
const updateserdataRoutes = require("./routes/updateuserdata");
const deleteuserdataRoutes = require("./routes/deleteuserdata");

app.get('/getuserdata', getuserdataRoutes);
app.put('/updateuserdata/:id', updateserdataRoutes);
app.delete('/deleteuserdata', deleteuserdataRoutes);

module.exports = app;
