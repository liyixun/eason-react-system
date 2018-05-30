import React from 'react';
import './index.less';
import {Row, Col, Input, Icon, Button, Alert, notification} from 'antd';

const {TextArea} = Input;

class PublishComment extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      nickname: {
        value: '',
        error: '',
        valid: false,
      },
      commentContent: {
        value: '',
        error: '',
        valid: false
      },
    }
  }

  handleNicknameChange = (event) => {
    let value = event.target.value;
    this.checkNickNameIsValid(value);
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
    if(value.length <= 0){
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

  addSmileIconIntoCommentContent = () => {
    let commentContent = this.state.commentContent.value + ':)';
    this.checkCommentContentIsValid(commentContent);
  };

  addLinkIconIntoCommentContent = () => {
    let commentContent = this.state.commentContent.value + '@';
    this.checkCommentContentIsValid(commentContent);
  };

  submitCommentContent = () => {
    this.checkCommentContentIsValid(this.state.commentContent.value);
    this.checkNickNameIsValid(this.state.nickname.value);
    if (this.state.nickname.valid && this.state.commentContent.valid) {
      console.log('提交成功');
    } else {
      let errorMsgDescription = this.state.nickname.error + '  ' + this.state.commentContent.error;
      notification.warn({
        message: '提交失败',
        description: errorMsgDescription
      })
    }
  };

  render() {
    return (
      <div className="public-comment">
        <Row gutter={16}>
          <Col span={3}>
            <Input size="small" placeholder="昵称" value={this.state.nickname.value}
                   onChange={this.handleNicknameChange}/>
          </Col>
          <Col span={21}>
            <TextArea placeholder="评论" value={this.state.commentContent.value} onChange={this.handleCommentContent}/>
            <div className="public-comment-footer">
              <div className="icon-footer">
                <a onClick={this.addSmileIconIntoCommentContent}>
                  <Icon type="smile-o"/>
                </a>
                <a onClick={this.addLinkIconIntoCommentContent}>
                  <Icon type="link"/>
                </a>
              </div>
              <div className="submit-footer">
                <span>{140 - this.state.commentContent.value.length}</span>
                <Button type="primary" onClick={this.submitCommentContent}>提交</Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

// const mapStateToProps = (state, ownProps) => {
//   return {activeCommentType: state.Rank.activeCommentType};
// };
//
// export default connect(mapStateToProps, null)(PublishComment);
export default PublishComment;
