import React from 'react';
import {Menu, Layout, Icon} from 'antd';
import {Link} from 'react-router-dom';
import './index.less';
import menuList from '../../../menu';

const Sider = Layout.Sider;
const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

class Sidebar extends React.PureComponent {
  state = {
    collapsed: false
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({collapsed})
  };

  /**
   * 处理菜单栏的路由跳转
   * @param menuList
   */
  handleRouteLink = (menuList) => {
    menuList.forEach(item => {
      if(!item.child) {
        item.link = '/' + item.key;
      } else {
        item.child.forEach(subItem => {
          subItem.link = '/' + item.key + '/' + subItem.key;
        });
      }
    });
  };

  parseMenu = () => {
    this.handleRouteLink(menuList);
    return menuList.map(menuItem => {
      if(!menuItem.child) {
        return <MenuItem key={menuItem.key}>
          <Link to={menuItem.link}>
            <Icon type={menuItem.icon}/>
            <span>{menuItem.name}</span>
          </Link>
        </MenuItem>
      } else {
        return <SubMenu key={menuItem.key} title={<span><Icon type={menuItem.icon}/><span>{menuItem.name}</span></span>}>
          {
            menuItem.child.map(subMenuItem => {
              return <MenuItem key={subMenuItem.key}>
                <Link to={subMenuItem.link}>
                  <Icon type={subMenuItem.icon}/>
                  <span>{subMenuItem.name}</span>
                </Link>
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
        <div className="sidebar-logo"/>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {
            this.parseMenu()
          }
        </Menu>

      </Sider>
    );
  }
}

export default Sidebar;