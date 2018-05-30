import React from 'react';
import './index.less';
import {Row, Col, Pagination} from 'antd';
import CommentItem from '../CommentItem';

import {getMusicCommentByType, getMoreMusicComment} from '../../services/music';

class CommentComponent extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      commentData: {}
    }
  }

  componentDidMount() {
    if (this.props.commentType) {
      getMusicCommentByType({type: this.props.commentType}).then(res => {
        this.setState({
          commentData: res
        });
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commentType !== nextProps.commentType) {
      getMusicCommentByType({type: nextProps.commentType}).then(res => {
        this.setState({
          commentData: res
        });
      });
    }
  }

  getMoreCommentInfo = (pageNum, pageSize) => {
    let params = {
      type: this.props.commentType,
      pageNum: pageNum,
      pageSize: pageSize
    };
    getMoreMusicComment(params).then(res => {
      this.setState({
        commentData: res
      });
    });
  };

  render() {
    return (
      <div className="comment-component">
        <Row>
          <Col span={24}>
            <div className="comment-head">
              <span className="comment-head-title">评论</span>
              <span className="comment-head-total">共{this.state.commentData.total}条评论</span>
            </div>
            <div className="comment-list">
              <h3 className="comment-list-title">精彩评论</h3>
              {
                this.props.commentType && this.state.commentData && this.state.commentData.hotComments && this.state.commentData.hotComments.length ? this.state.commentData.hotComments.map((item, index) => {
                    return <CommentItem commentInfo={item} type={this.props.commentType}
                                        key={item.commentId}></CommentItem>
                  })
                  :
                  <span>暂无数据</span>
              }
            </div>
            <div className="comment-list">
              <h3 className="comment-list-title">最新评论({this.state.commentData.total})</h3>
              {
                this.props.commentType && this.state.commentData && this.state.commentData.comments && this.state.commentData.comments.length ? this.state.commentData.comments.map(item => {
                    return <CommentItem commentInfo={item} key={item.commentId}
                                        type={this.props.commentType}></CommentItem>
                  })
                  :
                  <span>暂无数据</span>
              }
              <Row>
                <Col span={10} offset={7}>
                  <Pagination defaultCurrent={1} defaultPageSize={20} onChange={this.getMoreCommentInfo}
                              total={this.state.commentData.total}></Pagination>
                </Col>
              </Row>

            </div>
          </Col>
        </Row>
      </div>
    );
  }

}

export default CommentComponent;
