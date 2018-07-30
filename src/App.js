import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Forum from './components/Forum/Forum';
import Welcome from './components/Welcome/Welcome';
import NewPost from './components/NewPost/NewPost';
import Profile from './components/Profile/Profile';
import Map from './components/Map/Map';
import Questions from './components/Questions/Questions';
import Convo from './components/Convo/Convo';
import Messages from './components/Messages/Messages';
import Calendar from './components/Calendar/Calendar';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import ManagePosts from './components/ManagePosts/ManagePosts';
import './App.css';

class App extends Component {
  render() {
    return (
      // <div>Stop</div>
      <HashRouter>
        <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/forum" component={Forum} />
          <Route path="/new" component={NewPost} />
          <Route path="/profile" component={Profile} />
          <Route path="/find" component={Map} />
          <Route path="/getstarted" component={Questions} />
          <Route path="/messages" component={Messages} />
          <Route path="/message/:id" component={Convo} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/privacyPolicy" component={PrivacyPolicy} />
          <Route path="/manage" component={ManagePosts} />
        </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
