const fs = require('fs');
const Mock = require('mockjs');
const Random = Mock.Random;
const uuidv1 = require('uuid/v1');

exports.getMusicCommentByType = async (ctx, next) => {
  let type = ctx.request.body.type;
  ctx.body = readCommentByType(type);
};

exports.getMoreMusicComment = async (ctx, next) => {
  let params = ctx.request.body;
  let result = readCommentByType(params.type);
  if (result && result.comments && result.comments.length) {
    result.comments.forEach(item => {
      if (item.user && item.user.nickname) {
        item.user.nickname = Random.cname(4);
      }
      item.content = Random.cword(10, 140);
      item.time += params.pageNum * params.pageSize * 2000;
    });
  }
  ctx.body = result;
};

exports.changeLikeToComment = async (ctx, next) => {
  let params = ctx.request.body;
  let commentData = readCommentByType(params.type);
  if (commentData && commentData.comments) {
    commentData.comments.forEach(item => {
      if (item.commentId == params.commentId) {
        if (item.liked) {
          item.likedCount--;
        } else {
          item.likedCount++;
        }
        item.liked = !item.liked;
      }
    });
  }
  writeCommentToFile(commentData, params.type);
  ctx.body = {};
};

exports.getMusicList = async (ctx, next) => {
  let result = {};
  result.total = parseInt(Math.random() * 10000000);
  result.items = [];
  for (let i = 0; i < 30; i++) {
    let obj = {};
    obj.time = Random.date('mm:ss');
    obj.flag = parseInt(Math.random() * 10) % 2 === 0 ? 'NEW' : Random.natural(-30, 30);
    obj.title = Random.csentence(5, 20);
    obj.singer = Random.cname();
    obj.index = i + 1;
    obj.key = uuidv1();
    result.items.push(obj);
  }
  ctx.body = result;
};

exports.queryMusicSheetList = async (ctx, next) => {
  let musicImgLinkList = JSON.parse(fs.readFileSync('./data/musicMenuImgLink.json'));
  let resultList = [];
  for (let i = 0; i < 10; i++) {
    let result = {};
    result.musicSheetBgImg = musicImgLinkList[i];
    result.playCount = parseInt(Math.random() * 100000);
    result.sheetName = Random.csentence(5, 20);
    result.sheetOwner = Random.cname();
    result.key = uuidv1();
    resultList.push(result);
  }
  ctx.body = resultList;
};

function readCommentByType(type) {
  let result = null;
  switch (type) {
    case 'SOAR':
      result = JSON.parse(fs.readFileSync('./data/soarMusic.json'));
      break;
    case 'NEW':
      result = JSON.parse(fs.readFileSync('./data/newMusic.json'));
      break;
    case 'ORIGINAL':
      result = JSON.parse(fs.readFileSync('./data/originalMusic.json'));
      break;
    case 'HOT':
      result = JSON.parse(fs.readFileSync('./data/hotMusic.json'));
      break;
    default:
      result = null;
      break;
  }
  if (result){
    setUUIDKeyToList(result.comments);
    setUUIDKeyToList(result.hotComments);
    setUUIDKeyToList(result.TopComments);
  }
  return result;
}

function writeCommentToFile(data, type) {
  switch (type) {
    case 'SOAR':
      fs.writeFileSync('./data/soarMusic.json', JSON.stringify(data));
      break;
    case 'NEW':
      fs.writeFileSync('./data/newMusic.json', JSON.stringify(data));
      break;
    case 'ORIGINAL':
      fs.writeFileSync('./data/originalMusic.json', JSON.stringify(data));
      break;
    case 'HOT':
      fs.writeFileSync('./data/hotMusic.json', JSON.stringify(data));
      break;
    default:
      break;
  }
}

function setUUIDKeyToList(list) {
  if(list && list.length){
    list.forEach(item => {
      item.key = uuidv1();
    });
  }
}
