const mongoose = require("mongoose");

const landingSchema = new mongoose.Schema({
  heroTittleMain: {
    type: String,
    required: [true, "Main page needs a hedding"],
  },
  heroShortText: {
    type: String,
    required: [true, "ShortText is required"],
  },
  visionAndMissionTittle: {
    type: String,
    required: [true, "Tittle required"],
  },
  visionAndMissionText: {
    type: String,
    required: [true, "Text-Required!"],
  },
  ourtTeamText: {
    type: String,
    required: [true, "Text-Required!"],
  },
});
const LandingPage = mongoose.model("LandingPage", landingSchema);
module.exports = LandingPage;
