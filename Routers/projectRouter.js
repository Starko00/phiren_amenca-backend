const express = require("express");
const {
  getProject,
  createProject,
  getAllProjects,
  getAllProjectsInAyear,
  updateProject,
  deleteProject,
  uploadFiles,
  uploadProjectFile,
} = require("../Controllers/projectsControllers");

const router = express.Router();
router.route('/').get((req,res,next)=>{res.status(200).json({msg:"Documentation for api"})})
router.route("/getproject").post( getProject).patch(updateProject).delete(deleteProject);
router.route("/projectFiles").post(uploadProjectFile,uploadFiles)
router.post("/createPorject", createProject);
router.route("/projects").post(getAllProjectsInAyear).get(getAllProjects);

module.exports = router;
