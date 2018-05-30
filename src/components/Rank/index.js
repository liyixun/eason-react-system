import React from 'react';
import './index.less';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Tabs, Table, Icon, notification} from 'antd';
import CommentComponent from '../CommentComponent';
import PublishComment from '../PublishComment';
import ReplyComment from '../ReplyComment';
import MusicBtnGroup from '../MusicBtnGroup';
import {musicRankCreator} from '../../redux/Rank.js';

import {getMusicList} from '../../services/music.js';

const TabPane = Tabs.TabPane;

class Rank extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.tabList = [
      {
        key: 'SOAR',
        value: '飙升榜',
      },
      {
        key: 'NEW',
        value: '新歌榜',
      },
      {
        key: 'ORIGINAL',
        value: '原创歌曲榜',
      },
      {
        key: 'HOT',
        value: '热歌榜',
      },
    ];
    this.columns = [{
      title: '序号',
      dataIndex: 'index',
      key: 'index',
    }, {
      title: '',
      dataIndex: 'flag',
      key: 'flag',
      render: text => (typeof text === 'string') ? <span className="new-flag">{text}</span> :
        <div>
          {
            text >= 0 ?
              <span>
              <Icon type="arrow-up"></Icon>
               <span className="up-flag">{text}</span>
            </span>
              :
              <span>
              <Icon type="arrow-down"></Icon>
               <span className="down-flag">{-text}</span>
            </span>
          }
        </div>
    }, {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    }, {
      title: '时长',
      dataIndex: 'time',
      key: 'time',
      render: (text, record) => <MusicBtnGroup record={record}></MusicBtnGroup>
    }, {
      title: '歌手',
      dataIndex: 'singer',
      key: 'singer'
    }];
    this.state = {
      musicList: [],
      musicTotal: 0
    };
  }

  componentDidMount() {
    this.getMusicList();
  }

  changeTabEvent = (key) => {
    this.props.handleChangeCommentType(key);
    this.getMusicList();
  };

  getMusicList() {
    getMusicList().then(res => {
      this.setState({
        musicList: res && res.items ? res.items : [],
        musicTotal: res ? res.total : 0
      })
    });
  }

  render() {
    const tableStyle = {'margin-bottom': '20px'};
    const playTotalStyle = {'font-weight': 'bold'};
    return (
      <div>
        <Tabs onChange={this.changeTabEvent} defaultActiveKey={this.props.activeCommentType}>
          {
            this.tabList.map(item => {
              return <TabPane tab={item.value} key={item.key}>
                <div className="music-title">
                  <h3>歌曲列表</h3>
                  <span>100首歌</span>
                  <div>
                    <span>播放：</span>
                    <span style={playTotalStyle}>{this.state.musicTotal}</span>次
                  </div>
                </div>
                <Table columns={this.columns} dataSource={this.state.musicList} pagination={false} rowKey="key"
                       style={tableStyle} bordered={true} rowClassName="musicList-row"></Table>
                <PublishComment></PublishComment>
                <CommentComponent commentType={item.key}></CommentComponent>
              </TabPane>
            })
          }
        </Tabs>
        <ReplyComment></ReplyComment>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {activeCommentType: state.Rank.activeCommentType};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleChangeCommentType: bindActionCreators(musicRankCreator, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Rank);
