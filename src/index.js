import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Sidebar from './components/Common/Sidebar';
import Topbar from './components/Common/Topbar';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd';
import {Layout} from 'antd';

const {Footer, Content } = Layout;


const HomePage = () => <h1>Home Page</h1>;
const UserPage = () => <h1>User Page</h1>;
const NotFoundPage = () => <h1>Not Found Page</h1>;


const PrimaryLayout = () =>
  <div className="ers-primary-layout">
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar/>
      <Layout>
        <Topbar/>
        <Content className="ers-content">
          <div className="ers-content-body">
            <main>
              <Switch>
                <Route path="/home" exact component={HomePage}/>
                <Route path="/user" component={UserPage}/>
                <Route path="/404" component={NotFoundPage}/>
                <Redirect to="/404"/>

              </Switch>
            </main>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>

  </div>;

const MyApp = () =>
  <BrowserRouter>
    <PrimaryLayout/>
  </BrowserRouter>;


ReactDOM.render(<MyApp/>, document.getElementById('root'));
registerServiceWorker();
