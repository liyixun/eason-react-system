import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
// import {Router, Route, Switch} from 'react-router';
import {BrowserRouter, Route, Link, Switch, Redirect} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

const HomePage = () => <h1>Home Page</h1>;
const UserPage = () => <h1>User Page</h1>;
const NotFoundPage = () => <h1>Not Found Page</h1>;


const PrimaryLayout = () =>
  <div className="primary-layout">
    <header>Our react router 4 App</header>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/user">user</Link>
      </li>
    </ul>
    <main>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/user" component={UserPage}/>
        <Route path="/404" component={NotFoundPage}/>
        <Redirect to="/404"/>
      </Switch>
    </main>
  </div>;

const MyApp = () =>
  <BrowserRouter>
    <PrimaryLayout/>
  </BrowserRouter>;


ReactDOM.render(<MyApp/>, document.getElementById('root'));
registerServiceWorker();
