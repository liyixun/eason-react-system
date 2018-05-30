/**
 * 一些约定:
 *
 * 1. redux相关的action/reducer都放到redux文件夹中, 每个组件一个文件, 文件名和组件名相同
 * 2. 在这个文件中, 要先定义action creator, 再定义组件的initState, 最后定义reducer
 * 3. 所有action creator function的名称都是XXXCreator, 采用camelCase风格, e.g., "sidebarCollapseCreator"
 * 4. 一般而言, creator返回的action的type字段, 跟creator函数的名字是对应的, 全部大写, 下划线风格, e.g., "SIDEBAR_COLLAPSE"
 * 5. action的格式采用社区的规范: https://github.com/acdlite/flux-standard-action
 * 6. 每个组件只有一个reducer
 */

// 定义action creator
export const musicRankCreator = (activeCommentType) => {
  return {type: 'CHANGE_COMMENT_TYPE', activeCommentType: activeCommentType};
};

export const replyCommentModalCreator = () => {
  return {type: 'SHOW_REPLY_COMMENT_MODAL'};
};

export const replyCommentTargetInfoCreator = (replyCommentTargetInfo) => {
  return {type: 'SET_REPLY_TARGET_INFO', replyCommentTargetInfo: replyCommentTargetInfo};
};

// 定义初始状态，每个组件只需要关心自己的状态
const initState = {
  activeCommentType: 'SOAR',
  showReplyCommentModal: false,
  replyCommentTargetInfo: {
    replyTargetCommentId: '',
    replyTargetNickname: '',
  }
};

const reducer = (state = initState, action = {}) => {
  switch (action.type) {
    case 'CHANGE_COMMENT_TYPE':
      return {...state, activeCommentType: action.activeCommentType};
    case 'SHOW_REPLY_COMMENT_MODAL':
      return {...state, showReplyCommentModal: !state.showReplyCommentModal};
    case 'SET_REPLY_TARGET_INFO':
      return {...state, replyCommentTargetInfo: action.replyCommentTargetInfo};
    default:
      return state;
  }
};

export default {initState, reducer};

