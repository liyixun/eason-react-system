import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Modal, Input} from 'antd';
import {replyCommentModalCreator} from '../../redux/Rank.js';

const {TextArea} = Input;

class ReplyComment extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      nickname: {
        value: '',
        error: '',
        valid: false,
      },
      replyContent: {
        value: '',
        error: '',
        valid: false,
      }
    }
  }

  handleNicknameChange = (event) => {
    this.checkNickNameIsValid(event.target.value);
  };

  handleCommentContent = (event) => {
    let value = event.target.value;
    this.checkCommentContentIsValid(value);
  };

  checkCommentContentIsValid(value) {
    let error = '';
    let valid = true;
    if (value <= 0) {
      error = '评论内容不能为空！';
      valid = false;
    }
    if (value > 140) {
      error = '评论内容过长！';
      valid = false;
    }
    this.setState({
      commentContent: {
        value: value,
        error: error,
        valid: valid
      }
    });
  }

  checkNickNameIsValid(value) {
    let error = '';
    let valid = true;
    if (value.length <= 0) {
      valid = false;
      error = '昵称不能为空！';
    }
    if (value.length > 20) {
      valid = false;
      error = '昵称过长';
    }
    this.setState({
      nickname: {
        value: value,
        error: error,
        valid: valid
      }
    });
  }


  render() {
    return (
      <Modal
        title={'回复' + this.props.replyTargetInfo.replyTargetNickname}
        visible={this.props.showReplyCommentModal}
        onOk={this.props.closeReplyCommentModal}
        onCancel={this.props.closeReplyCommentModal}
        okText="提交"
        cancelText="取消">

        <Input placeholder="昵称" value={this.state.nickname.value}
               onChange={this.handleNicknameChange} style={{'margin-bottom': '10px'}}/>
        <TextArea placeholder="评论" value={this.state.replyContent.value} onChange={this.handleCommentContent}/>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    showReplyCommentModal: state.Rank.showReplyCommentModal,
    replyTargetInfo: state.Rank.replyCommentTargetInfo
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    closeReplyCommentModal: bindActionCreators(replyCommentModalCreator, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReplyComment);
