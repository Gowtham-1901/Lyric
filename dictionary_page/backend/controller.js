const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const getdataRoutes = require("./routes/getdictionary");
const getlanguageRoutes = require("./routes/getlanguage");
const getcategoryRoutes = require("./routes/getcategory");
const getsubcategoryRoutes = require("./routes/getsubcategory");
// const putlanguageRouts = require("./routes/updatelan/:id");

app.get('/getdictionary',getdataRoutes);
app.get('/getlanguage',getlanguageRoutes);
app.get('/getcategory',getcategoryRoutes);
app.get('/getsubcategory',getsubcategoryRoutes);
// app.put('/updatelan/:id',putlanguageRouts)

module.exports = app;