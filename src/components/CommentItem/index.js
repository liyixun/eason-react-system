import React from 'react';
import './index.less';
import moment from 'moment';
import {Icon} from 'antd';
import {changeLikeToComment} from '../../services/music';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {replyCommentModalCreator, replyCommentTargetInfoCreator} from '../../redux/Rank.js';

class CommentItem extends React.PureComponent {

  constructor(...args) {
    super(...args);
  }

  formatTime(time) {
    return moment(time).format('mm:ss');
  }

  setLikedToComment = () => {
    let params = {
      commentId: this.props.commentInfo.commentId,
      type: this.props.type
    };
    changeLikeToComment(params).then(res => {

    });
  };

  replyComment = () => {
    let info = {
      replyTargetCommentId: this.props.commentInfo.commentId,
      replyTargetNickname: this.props.commentInfo.user.nickname,
    };
    this.props.setReplyCommentTargetInfo(info);
    this.props.openReplyCommentModal();
  };

  render() {
    return (
      <div className="comment-item">
        <div className="head">
          <a>
            <img src={this.props.commentInfo.user.avatarUrl} alt={this.props.commentInfo.user.nickname}/>
          </a>
        </div>
        <div className="content-wrap">
          <span className="nickname">{this.props.commentInfo.user.nickname}:&nbsp;</span>
          <span>{this.props.commentInfo.content}</span>
          {
            this.props.commentInfo.beReplied && this.props.commentInfo.beReplied.length ? this.props.commentInfo.beReplied.map((item, index) => {
                return <div className="content-reply" key={index}>
                  <span className="nickname">
                    {item.user.nickname} :
                  </span>
                  {item.content}
                </div>
              })
              : ''
          }
          <div className="content-footer">
            <span>{this.formatTime(this.props.commentInfo.time)}</span>
            <div>
              <a onClick={this.setLikedToComment}>
                {
                  this.props.commentInfo.liked ? <Icon type="like"></Icon> : <Icon type="like-o"></Icon>
                }
                ({this.props.commentInfo.likedCount})
              </a>
              <span className="sep">|</span>
              <a onClick={this.replyComment}>回复</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openReplyCommentModal: bindActionCreators(replyCommentModalCreator, dispatch),
    setReplyCommentTargetInfo: bindActionCreators(replyCommentTargetInfoCreator, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(CommentItem);
