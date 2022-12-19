const { findByIdAndUpdate } = require("./DB/Models/projectModel");
const projects = require("./DB/Models/projectModel");
const multer = require("multer");

// Gets one project by id
exports.getProject = async (req, res, next) => {
  try {
    const id = req.body._id;
    const project = await projects.findById(id);
    console.log(id);
    res.status(200).json({
      msg: `Project`,
      project,
    });
  } catch (error) {
    res.status(201).json(error);
  }
};

// Creates a project
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

// Gets all projects with all fields
exports.getAllProjects = async (req, res, next) => {
  try {
    const projectList = await projects.find();
    res.status(200).json({
      msg: "Projects found ",
      projectList,
    });
  } catch (error) {
    res.status(201).json(error);
  }
};

//Filters projects by year
exports.getAllProjectsInAyear = async (req, res, next) => {
  try {
    const requestedYear = await new Date(req.body.yearFilter);
    const requestedYearEnd = await new Date(
      String(parseInt(req.body.yearFilter) - 1)
    );
    console.log(requestedYearEnd);
    const projectList = await projects
      .find({ projectYear: { $gt: requestedYearEnd, $lte: requestedYear } })
      .select("projectImg projectName  secodnaryText");

    res.status(200).json({
      data: projectList,
    });
  } catch (error) {
    res.status(201).json({
      error,
    });
  }
};
//  Gets the list of projects, their names and years -- brief info
exports.getAllProjectsShor = async (req, res, next) => {
  try {
    const projectList = await projects
      .find()
      .select("_id projectName projectYear");
    res.status(200).json({
      msg: "Projects found ",
      projectList,
    });
  } catch (error) {}
};

//Delete a project
exports.deleteProject = async (req, res, next) => {
  try {
    const deletedProject = await projects.findByIdAndDelete(req.body._id);

    res.status(200).json({
      msg: `Project ${req.body._id} deleted`,
    });
  } catch (error) {
    res.status(201).json({
      error,
    });
  }
};
//Update the project

exports.updateProject = async (req, res, next) => {
  try {
    const data = req.body.data;
    console.log(req.body._id);

    const updatedProject = await projects.findByIdAndUpdate(
      { _id: req.body._id },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    console.log(updatedProject);
    res.status(200).json({ msg: "Landing page updated", updatedProject });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

//Upload project files/img

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/projects");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.id + "----" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage });

exports.uploadProjectFile = upload.single("document");

exports.uploadFiles = async (req, res, next) => {
  try {
    const filename = req.file.filename;
    const allFiles = await projects.findById({ _id: req.body.id });
    const updatedFileList = await projects.findByIdAndUpdate(
      { _id: req.body.id },
      { $push: { documentation: filename } },
      {
        new: true,
        unique: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      msg: "File uploaded",
      updatedFileList,
    });
  } catch (error) {
    res.status(201).json({
      error,
    });
  }
};
// Potrebno definisati odredjene filtere kako se ne bi uploadovali fajlovi koji vec postoje
exports.deleteFile = async (req, res, next) => {
  try {
    const fileToDrop = req.body.deleteFile;
    console.log(req)
    const deletedFile = await projects.findByIdAndUpdate(
      { _id: req.body.id },
      {
        $pull: { documentation: fileToDrop },
      },
      {
        new: true,
        unique: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      msg:"File deleted",
      deletedFile
    })


  } catch (error) {
    res.status(201).json({
      error
    })
  }
};
