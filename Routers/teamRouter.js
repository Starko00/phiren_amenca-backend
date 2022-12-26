const express = require('express')
const { addTeamMember, updateTeamMember, deleteTeamMember, getTeamMembers, uploadTeamMemberImg, uploadMemberImage, teamUploadImg } = require('../Controllers/teamController')
const teamController = require('../Controllers/teamController')

const router = express.Router()

router.route('/members').post(addTeamMember).patch(updateTeamMember).delete(deleteTeamMember).get(getTeamMembers)
router.route('/memberPhoto').post(teamController.teamUploadImg ,uploadTeamMemberImg)
router.route('/teamMember').post(teamController.getOneMember)
module.exports = router;
