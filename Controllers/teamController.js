const { json } = require("express");
const TeamMembers = require("./DB/Models/teamModel");
const multer = require("multer");

//Add team member
exports.addTeamMember = async (req, res, next) => {
  try {
    const newTeamMember = await TeamMembers.create({
      socialMediaLinkedIn: req.body.socialMediaLinkedIn,
      socialMediaInstagram: req.body.socialMediaInstagram,
      socialMediaFacebook: req.body.socialMediaFacebook,
      biography: req.body.biography,
      position: req.body.position,
      name: req.body.name,
    });
    res.status(200).json({
      msg: "Team member added!",
      newTeamMember,
    });
  } catch (error) {
    res.send(error);
  }
};

//Get teamMembers
exports.getTeamMembers = async (req, res, next) => {
  try {
    const allMembers = await TeamMembers.find().select("name position");
    res.status(200).json({
      msg: "Team members found",
      allMembers,
    });
  } catch (error) {
    res.status(201).json({
      error,
    });
  }
};
//Update team member
exports.updateTeamMember = async (req, res, next) => {
  try {
    const data = req.body.data;
    console.log(req.body);
    const updatedTeamMember = await TeamMembers.findByIdAndUpdate(
      { _id: req.body.id },
      data,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      msg: "Updated",
      updatedTeamMember,
    });
  } catch (error) {
    res.status(201).json({ error });
  }
};

//Delete team member
exports.deleteTeamMember = async (req, res, next) => {
  try {
    const deletedTeamMember = await TeamMembers.findByIdAndDelete({
      _id: req.body.id,
    });
    res.status(200).json({
      msg: "Deleted  team memeber",
      deletedTeamMember,
    });
  } catch (error) {
    res.send(error);
  }
};

//Add team member image
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
  
    cb(null, "./public/uploads/teamMembers");
  },
  filename: (req, file, cb) => {
    cb(null,  req.body.id + "----" + "memeberImg----" +file.originalname);
  },
});

const imgUpload = multer({ storage: imgStorage });
exports.teamUploadImg = imgUpload.single("teamimg");

exports.uploadTeamMemberImg = async (req, res, next) => {
  try {
    
    const filename = req.file.filename;

    const updatedImg = await TeamMembers.findByIdAndUpdate(
      { _id: req.body.id },
      { teamMemberPhoto: filename },
      {
        new: true,
        unique: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      msg: "File uploaded",
        updatedImg,
    });
  } catch (error) {
    res.status(201).json({
      error,
    });
  }
};

//Get a member by id

exports.getOneMember = async (req,res,next)=>{
    try {
        const memeber = await TeamMembers.findById({_id:req.body.id})
        res.status(200).json({
            memeber
        })
    } catch (error) {
        res.status(201).json(error)
    }
}