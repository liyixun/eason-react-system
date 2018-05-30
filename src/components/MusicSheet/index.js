import React from 'react';
import './index.less';
import {Radio} from 'antd';
import MusicStyleComponent from '../MusicStyleComponet';
import MusicSheetItem from '../MusicSheetItem';
import {queryMusicSheetList} from '../../services/music';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MusicSheet extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.state = {
      musicSheetList: []
    }
  }

  selectMusicStyle = (style) => {
    queryMusicSheetList().then(resp => {
      console.log(resp);
    });
  };
  componentDidMount() {
    queryMusicSheetList().then(resp => {
      this.state.setState({

      });
    });
  }

  render() {
    return (
      <div className="music-sheet">
        <div className="music-sheet-header">
          <h3>全部</h3>
          <MusicStyleComponent selectMusicStyle={this.selectMusicStyle}></MusicStyleComponent>
          <div className="radio-btn-group">
            <RadioGroup defaultValue="HOT">
              <RadioButton value="HOT">热门</RadioButton>
              <RadioButton value="NEWEST">最新</RadioButton>
            </RadioGroup>
          </div>
        </div>
        <div className="music-sheet-body">
          <ul>
            <li>
              <MusicSheetItem></MusicSheetItem>
            </li>
          </ul>
        </div>
      </div>
    );
  }

}

export default MusicSheet;
