const express = require('express');

const { createArticle, getAllArticles, getArticleById, deleteArticle, updateArticle, uploadNewsPhoto, uploadFiles } = require('../Controllers/newsControllers');

const router = express.Router();

router.route('/article').post(createArticle)
router.route('/singleArticle').post(getArticleById).delete(deleteArticle).patch(updateArticle)
router.route('/articlePhoto').post(uploadNewsPhoto,uploadFiles)
router.route('/').get(getAllArticles)



module.exports = router;