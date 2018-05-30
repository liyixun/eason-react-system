import { post, get } from './../utils/fetch';

export const getMusicCommentByType = (params) => post('/music/getMusicCommentByType', params);
export const getMoreMusicComment = (params) => post('/music/getMoreMusicComment', params);
export const changeLikeToComment = (params) => post('/music/changeLikeToComment', params);
export const getMusicList = (params) => post('/music/getMusicList', params);
export const queryMusicSheetList = (params) => post('/music/queryMusicSheetList', params);
