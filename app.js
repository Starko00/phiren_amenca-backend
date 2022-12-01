const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./Routers/projectRouter");
const dotenv = require("dotenv");

const mongoose = require('mongoose')


dotenv.config({path:'./config.env'}) // Config of ENV

const port = process.env.PORT || 8000 // Port declaration
const DB = process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(()=>{console.log("DB connected")})
const app = express(); // Server start

app.use(morgan("short")); //Logs requests
app.use(express.json()); //Enables req reading

app.use("/phiramenca/api/v1",projectRouter)


app.listen(port, () => {
  console.log(`App running on  PORT:  ${port}`);
});