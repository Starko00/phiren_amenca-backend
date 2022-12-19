const express = require("express");
const { createLandingPage, updateLandingPage, getLandingPage } = require("../Controllers/mainPageControllers");

const router = express.Router();

router.route("/createLanidngPage").post(createLandingPage)
router.route("/landingpageupdate").patch(updateLandingPage)
router.route('/landingpage').get(getLandingPage)
module.exports = router;
