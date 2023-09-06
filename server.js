require("dotenv").config()
const express = require("express");
const customerRoutes = require("./routes/customerRoutes");
const voucherRoutes = require("./routes/voucherRoutes");

const knex = require("./config/db");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(customerRoutes, voucherRoutes);

const port = process.env.PORT || 3000;
app.listen(port,(err) =>{ 
    
    console.log("listening at port 3000")

});