const mongoose = require("mongoose");

const DB = process.env.Database 

mongoose.connect(DB).then(() => {
    console.log("connnection established");
  }).catch((err) => console.log("error connecting", err));
// Middelware

