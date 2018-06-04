const router = require('koa-router')();
const controller = require('../controllers/music.server.controller');

router.prefix('/api/music');

router.post('/getMusicCommentByType', controller.getMusicCommentByType)
      .post('/changeLikeToComment', controller.changeLikeToComment)
      .post('/getMusicList', controller.getMusicList)
      .post('/queryMusicSheetList', controller.queryMusicSheetList)
      .post('/getMoreMusicComment', controller.getMoreMusicComment);

module.exports = router;

