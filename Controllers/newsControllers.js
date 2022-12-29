const express = require("express");
const multer = require("multer");
const News = require("./DB/Models/newsModel");

//Create news article
exports.createArticle = async (req, res, next) => {
  try {
    const currentDate = new Date();
    console.log();
    const article = await News.create({
      hedline: req.body.hedline,
      author: req.body.author,
      date: currentDate.toString(),
      content: req.body.content,
      tags: req.body.tags,
    });
    res.status(200).json({
      msg: "Created",
      article,
    });
  } catch (error) {
    res.status(201).json({
      msg: "Not-Created",
      error,
    });
  }
};
//Get news article by ID
exports.getArticleById = async (req, res, next) => {
  try {
    const article = await News.findById({ _id: req.body.id });
    res.status(200).json({
      msg: "Found",
      article,
    });
  } catch (error) {
    res.status(201).json({
      msg: "Error in getNesArticleById",
      error,
    });
  }
};
//Get All News Articles
exports.getAllArticles = async (req, res, next) => {
  try {
    const allArticles = await News.find();

    res.status(200).json({
      msg: "Found",
      allArticles,
    });
  } catch (error) {
    res.status(201).json({
      msg: "Error in getAllArticles",
      error,
    });
  }
};

//Delete news article by ID
exports.deleteArticle = async (req, res, next) => {
  try {
    const article = await News.findByIdAndDelete({ _id: req.body.id });
    res.status(200).json({
      msg: "Deleted",
      article,
    });
  } catch (error) {
    res.status(201).json({
      msg: "Error in deleteArticle",
      error,
    });
  }
};

//Update article

exports.updateArticle = async (req, res, next) => {
  try {
    
    console.log();
    const article = await News.findByIdAndUpdate({_id:req.body.id},{
      hedline: req.body.hedline,
      author: req.body.author,
      content: req.body.content,
      tags: req.body.tags,
    },{
        runValidators:true,
        new:true,
    });
    res.status(200).json({
      msg: "Updated",
      article,
    });
  } catch (error) {
    res.status(201).json({
      msg: "Not-Updated",
      error,
    });
  }
};

//Upload news picture

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/uploads/news");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.id + "----"+ "Article----"+ file.originalname);
    },
  });
  
  const upload = multer({ storage: fileStorage });
  
  exports.uploadNewsPhoto = upload.single("article");
  
  exports.uploadFiles = async (req, res, next) => {
    try {
      const filename = req.file.filename;
      const allFiles = await News.findById({ _id: req.body.id });
      const updatedFileList = await News.findByIdAndUpdate(
        { _id: req.body.id },
        { photo:filename},
        {
          new: true,
          unique: true,
          runValidators: true,
        }
      );
  
      res.status(200).json({
        msg: "Photo uploaded",
        updatedFileList,
      });
    } catch (error) {
      res.status(201).json({
        error,
      });
    }
  };