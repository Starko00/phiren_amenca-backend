const express = require("express");
const morgan = require("morgan");
const projectRouter = require("./Routers/projectRouter");
const dotenv = require("dotenv");
const history = require('connect-history-api-fallback')
const landingRouter = require('./Routers/mainPageRouter')
const teamRouter = require('./Routers/teamRouter')
const newsRouter = require('./Routers/newsRouter')
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

app.use(
  history({
    rewrites: [
      {
        from: /\/*/,
        to: (context) => {
          console.log(context.parsedUrl.pathname);
          if (
            context.parsedUrl.pathname.indexOf("/asset-manifest.json") == 0 ||
            context.parsedUrl.pathname.indexOf("/img") == 0 ||
            context.parsedUrl.pathname.indexOf("/static") == 0 ||
            context.parsedUrl.pathname.indexOf("/api") == 0 ||
            context.parsedUrl.pathname.indexOf("/manifest.json") == 0 ||
            context.parsedUrl.pathname.indexOf("/robots.txt") == 0 ||
            context.parsedUrl.pathname.indexOf("/public") == 0 ||
            context.parsedUrl.pathname.indexOf("/blogImgs") == 0 
          ) {
            return context.parsedUrl.pathname;
          } else return "/index.html";
        },
      },
    ],
  })
);







app.use(morgan("short")); //Logs requests
app.use(express.json()); //Enables req reading

app.use("/", express.static("../phira-build"));

app.use(express.static(path.join(__dirname,'public')));

app.use("/phiramenca/api/v1",projectRouter)
app.use("/phiramenca/api/v1/landing",landingRouter)
app.use("/phiramenca/api/v1/team", teamRouter)
app.use("/phiramenca/api/v1/news",newsRouter)

app.listen(port, () => {
  console.log(`App running on  PORT:  ${port}`);
});
