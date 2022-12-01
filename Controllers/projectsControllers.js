const projects = require("./DB/Models/projectModel");

exports.getProject = async (req, res, next) => {
  try {
    const id = req.body.projectId;
    const project = await projects.findById(id);
    res.status(200).json({
      msg: `Project`,
      project,
    });
  } catch (error) {
    res.status(201).json(error);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const data = req.body;

    const newProject = await projects.create({
      projectName: data.projectName,
      secodnaryText: data.secodnaryText,
      primaryText: data.primaryText,
      projectYear: data.projectYear,
      documentation: data.documentation,
      img: data.img,
    });

    res.status(200).json({
      msg: `Project "${req.body.projectName}" created`,
      data: newProject,
    });
  } catch (error) {
    res.status(201).json({
      status: "Couldn't compleate creation",
      error,
    });
  }
};
exports.getAllProjects = async (req, res, next) => {
  try {
    const projectList = await projects.find().select("_id projectName projectYear");
    res.status(200).json({
        
        msg: "Projects foudn",
        projectList 

        });
  } catch (error) {
    res.status(201).json(error);
  }
};
