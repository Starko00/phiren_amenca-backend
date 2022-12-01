const express = require("express")
const { getProject, createProject, getAllProjects } = require("../Controllers/projectsControllers")

const router = express.Router()

router.post('/getproject', getProject)
router.post('/createPorject', createProject)
router.get('/projects',getAllProjects)

module.exports = router
