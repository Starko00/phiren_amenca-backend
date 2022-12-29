const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    hedline:String,
    author:String,
    date:Date,
    content:String,
    tags:[String],
    photo:String
})
const News = mongoose.model("News", NewsSchema)
module.exports = News


