import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.less';
import store from './redux/store';
import Sidebar from './components/Common/Sidebar';
import Topbar from './components/Common/Topbar';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'antd';
import {Layout} from 'antd';
import Rank from './components/Rank';
import globalConfig from './config';

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
                <Route path="/rank" component={Rank}/>
                <Redirect to="/404"/>

              </Switch>
            </main>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          <div dangerouslySetInnerHTML={{__html: globalConfig.footer}}></div>
        </Footer>
      </Layout>
    </Layout>

  </div>;

const MyApp = () =>
  <Provider store={store}>
    <BrowserRouter>
      <PrimaryLayout/>
    </BrowserRouter>
  </Provider>;

ReactDOM.render(<MyApp/>, document.getElementById('root'));
registerServiceWorker();
