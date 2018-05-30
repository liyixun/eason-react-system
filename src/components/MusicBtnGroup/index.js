import React from 'react';
import './index.less';
import {Icon, notification} from 'antd';
import {connect} from 'react-redux';

class MusicBtnGroup extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      showBtnGroup: false
    };
  }

  btnGroupEnterLeaveEvent = () => {
    this.setState({
      showBtnGroup: !this.state.showBtnGroup
    });
  };

  handleBtnClickEvent(operateMsg){
    notification.info({
      message: operateMsg + this.props.record.title + '成功',
      duration: 3
    });
  }

  render() {
    return (
      <div className="music-btn-group" onMouseEnter={this.btnGroupEnterLeaveEvent}
           onMouseLeave={this.btnGroupEnterLeaveEvent}>
        {
          this.state.showBtnGroup ?
            <div className="btn-group">
              <a onClick={() => this.handleBtnClickEvent('添加')}>
                <Icon type="plus"></Icon>
              </a>
              <a onClick={() => this.handleBtnClickEvent('收藏')}>
                <Icon type="plus-square-o"/>
              </a>
              <a onClick={() => this.handleBtnClickEvent('转发')}>
                <Icon type="export"/>
              </a>
              <a onClick={() => this.handleBtnClickEvent('下载')}>
                <Icon type="download"/>
              </a>
            </div>
            :
            <div className="time">
              <span>{this.props.record.time}</span>
            </div>
        }
      </div>
    );
  }

}

export default connect(null, null)(MusicBtnGroup);
