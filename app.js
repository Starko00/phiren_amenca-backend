const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./Routers/projectRouter");
const dotenv = require("dotenv");
const landingRouter = require('./Routers/mainPageRouter')
const teamRouter = require('./Routers/teamRouter')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
dotenv.config({path:'./config.env'}) // Config of ENV
const app = express()
app.use(cors({
origin:'*'
}))

const port = process.env.PORT || 8000 // Port declaration
const DB = process.env.DATABASE.replace("<password>",process.env.DATABASE_PASSWORD)
mongoose.connect(DB).then(()=>{console.log("DB connected")})

app.use(morgan("short")); //Logs requests
app.use(express.json()); //Enables req reading

app.use(express.static(path.join(__dirname,'public')));

app.use("/phiramenca/api/v1",projectRouter)
app.use("/phiramenca/api/v1/landing",landingRouter)
app.use("/phiramenca/api/v1/team", teamRouter)

app.listen(port, () => {
  console.log(`App running on  PORT:  ${port}`);
});
