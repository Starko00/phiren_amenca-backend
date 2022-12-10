const express = require("express");
const { createLandingPage, updateLandingPage } = require("../Controllers/mainPageControllers");

const router = express.Router();

router.route("/createLanidngPage").post(createLandingPage)
router.route("/landingpageupdate").patch(updateLandingPage)

module.exports = router;
