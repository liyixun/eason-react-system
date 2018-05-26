import React from 'react';
import {Menu, Layout, Icon} from 'antd';
import './index.less';
import menuList from '../../../menu';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Nav extends React.PureComponent {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed})
  };

  parseMenu = () => {
    return menuList.map(menuItem => {
      if(!menuItem.child) {
        return <MenuItem key={menuItem.key}>
          <Icon type={menuItem.icon}/>
          <span>{menuItem.name}</span>
        </MenuItem>
      } else {
        return <SubMenu key={menuItem.key} title={<span><Icon type={menuItem.icon}/><span>{menuItem.name}</span></span>}>
          {
            menuItem.child.map(subMenuItem => {
              return <MenuItem key={subMenuItem.key}>
                <Icon type={subMenuItem.icon}/>
                <span>{subMenuItem.name}</span>
              </MenuItem>
            })
          }
        </SubMenu>
      }
    });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {
            this.parseMenu()
          }
        </Menu>

      </Sider>
    );
  }
}

export default Nav;