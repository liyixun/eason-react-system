import React from 'react';
import {Layout} from 'antd';
import './index.less';

const {Header} = Layout;

class Topbar extends React.PureComponent {
  render() {
    return (
      <Header className="ers-topbar">
        <div className="ers-topbar-body">
          <h3 className="title">Eason react system</h3>
          <div className="operate-area">
            <a>eason</a>
            <a className="m-l-md">注销</a>
          </div>
        </div>
      </Header>
    );
  };

}

export default Topbar;

