const express = require("express");
const dotenv =require("dotenv")
const mongoose = require("mongoose");
const app = express();

dotenv.config({path:"./config.env"})

require("./DB/conn")
app.use(express.json())

app.use(require('./routes/auth'))


const middleware = (req, res, next) => {
  console.log("middleware");
  next();
};


app.listen(3030, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
