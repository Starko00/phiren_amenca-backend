const { json } = require("express");
const landingPage = require("./DB/Models/mainPageModel");

exports.createLandingPage = async (req, res, next) => {
  try {
    console.log(req.body);
    const landingPageCreation = await landingPage.create({
      heroTittleMain: req.body.heroTittleMain,
      heroShortText: req.body.heroShortText,
      visionAndMissionTittle: req.body.visionAndMissionTittle,
      visionAndMissionText: req.body.visionAndMissionText,
      ourtTeamText: req.body.ourtTeamText,
      aboutUs:req.body.aboutUs
    });
    res.status(200).json({ msg: "Landing page created", landingPageCreation });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

exports.updateLandingPage = async (req, res, next) => {
  try {
    const LandingPageUpdate = await landingPage.findByIdAndUpdate(
      { _id: req.body._id },
      {
        heroTittleMain: req.body.heroTittleMain,
        heroShortText: req.body.heroShortText,
        visionAndMissionTittle: req.body.visionAndMissionTittle,
        visionAndMissionText: req.body.visionAndMissionText,
        ourtTeamText: req.body.ourtTeamText,
        aboutUs:req.body.aboutUs
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ msg: "Landing page updated", LandingPageUpdate });
  } catch (error) {
    res.status(201).json({
      error: error,
    });
  }
};

exports.getLandingPage =async (req,res,next)=>{
  try {
      const landingPageData = await landingPage.find()
      res.status(200).json(
        landingPageData
      )



  } catch (error) {
    
  }
}
