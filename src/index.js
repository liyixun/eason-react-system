import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Sidebar from './components/Common/Sidebar';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd';
import {Layout, Menu, Breadcrumb, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

const { Header, Footer, Content, Sider } = Layout;


// const HomePage = () => <h1>Home Page</h1>;
const UserPage = () => <h1>User Page</h1>;
const NotFoundPage = () => <h1>Not Found Page</h1>;


const PrimaryLayout = () =>
  <div className="">
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>

    <main>
      <Switch>
        {/*<Route path="/" exact component={HomePage}/>*/}
        <Route path="/user" component={UserPage}/>
        <Route path="/404" component={NotFoundPage}/>
        {/*<Redirect to="/404"/>*/}
      </Switch>
    </main>
  </div>;

const MyApp = () =>
  <BrowserRouter>
    <PrimaryLayout/>
  </BrowserRouter>;


ReactDOM.render(<MyApp/>, document.getElementById('root'));
registerServiceWorker();
