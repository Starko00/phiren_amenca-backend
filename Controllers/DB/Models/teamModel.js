const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Team member needs a name"],
  },
  position: {
    type: String,
    required: [true, "Position is required"],
  },
  biography: {
    type: String,
    required: [true, "Biography required"],
  },
  socialMediaFacebook: {
    type: String,
    required: [true, "Link required"],
  },
  socialMediaInstagram: {
    type: String,
    required: [true, "Link required"],
  },
  socialMediaLinkedIn: {
    type: String,
    required: [true, "Link required"],
  },
  teamMemberPhoto:String
});
const TeamMembers = mongoose.model("Team", teamSchema);
module.exports = TeamMembers;