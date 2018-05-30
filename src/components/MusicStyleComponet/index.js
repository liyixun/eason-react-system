import React from 'react';
import './index.less';
import {Button, Icon} from 'antd';
import config from './config';
import {connect} from 'react-redux';
import ClickOutside from 'react-click-outside';

class MusicStyleComponent extends React.PureComponent {
  state = {
    showSelectArea: false,
    currentMusicStyle: '',
  };

  clickBtnEvent = () => {
    this.setState({
      showSelectArea: !this.state.showSelectArea,
    });
  };

  selectMusicStyle(item) {
    if (item !== this.state.currentMusicStyle) {
      this.props.selectMusicStyle(item);
      this.setState({
        currentMusicStyle: item,
        showSelectArea: !this.state.showSelectArea,
      });
    } else {
      this.setState({
        showSelectAreaClickOutside: !this.state.showSelectArea,
      });
    }
  }

  clickOutSide() {
    if (this.state.showSelectArea) {
      this.setState({
        showSelectArea: !this.state.showSelectArea,
      });
    }
  }

  render() {

    return (
      <div className="music-style-component">
        <ClickOutside onClickOutside={::this.clickOutSide}>
          <Button type="default" size="small" onClick={this.clickBtnEvent}>
            <span>全部</span>
            <Icon type="down"></Icon>
          </Button>
          {
            this.state.showSelectArea ?
              <div className="style-select-area">
                <div className="style-select-head">
                  <Button type="default">全部风格</Button>
                </div>
                <div className="style-select-body">
                  <dl>
                    <dt>语种</dt>
                    <dd>
                      {
                        config.languages.map((item, index) => {
                          return (
                            <span key={index}>
                          <a onClick={() => this.selectMusicStyle(item)}>{item}</a>
                          <span className="line">|</span>
                        </span>
                          )
                        })
                      }
                    </dd>
                  </dl>
                  <dl>
                    <dt>风格</dt>
                    <dd>
                      {
                        config.styles.map((item, index) => {
                          return (
                            <span key={index}>
                          <a onClick={() => this.selectMusicStyle(item)}>{item}</a>
                          <span className="line">|</span>
                        </span>
                          )
                        })
                      }
                    </dd>
                  </dl>
                  <dl>
                    <dt>场景</dt>
                    <dd>
                      {
                        config.scenes.map((item, index) => {
                          return (
                            <span key={index}>
                          <a onClick={() => this.selectMusicStyle(item)}>{item}</a>
                          <span className="line">|</span>
                        </span>
                          )
                        })
                      }
                    </dd>
                  </dl>
                  <dl>
                    <dt>情感</dt>
                    <dd>
                      {
                        config.emotions.map((item, index) => {
                          return (
                            <span key={index}>
                          <a onClick={() => this.selectMusicStyle(item)}>{item}</a>
                          <span className="line">|</span>
                        </span>
                          )
                        })
                      }
                    </dd>
                  </dl>
                  <dl>
                    <dt>主题</dt>
                    <dd>
                      {
                        config.themes.map((item, index) => {
                          return (
                            <span key={index}>
                          <a onClick={() => this.selectMusicStyle(item)}>{item}</a>
                          <span className="line">|</span>
                        </span>
                          )
                        })
                      }
                    </dd>
                  </dl>
                </div>
              </div>
              : ''
          }
        </ClickOutside>
      </div>
    );
  }

}

export default connect(null, null)(MusicStyleComponent);
