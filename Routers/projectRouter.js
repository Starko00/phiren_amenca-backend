const express = require("express");
const {
  getProject,
  createProject,
  getAllProjects,
  getAllProjectsInAyear,
} = require("../Controllers/projectsControllers");

const router = express.Router();

router.post("/getproject", getProject);
router.post("/createPorject", createProject);
router.route("/projects").post(getAllProjectsInAyear).get(getAllProjects);

module.exports = router;
