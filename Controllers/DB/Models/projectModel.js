const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    lowercase: true,
    required: [true, "The project can't be created without a name."],
  },
  projectYear: {
    type: Date,
    required: [
      true,
      "The project can't be created without assigning a propper date.",
    ],
  },
  documentation: {
    type:[String],
    uniqe:true
  },
  Projectimg: String,
  primaryText: {
    type: String,

    required: [true, "The project can't be created without any description."],
  },
  secodnaryText: {
    type: String,

    required: [
      true,
      "The project can't be created without a short description.",
    ],
  },
  projectImg:String
});
const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
