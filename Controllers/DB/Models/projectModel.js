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
  documentation: [String],
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
});
const Projects = mongoose.model("Projects", projectSchema);
module.exports = Projects;
