import React from 'react';
import './index.less';
import {connect} from 'react-redux';

class MusicSheetItem extends React.PureComponent {
  constructor(...args){
    super(...args);
  }

  render() {
    return (
      <div className="music-sheet-item">

      </div>
    );
  }

}

export default connect(null, null)(MusicSheetItem);
