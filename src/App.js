import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Forum from './components/Forum/Forum';
import Welcome from './components/Welcome/Welcome';
import Post from './components/Post/Post';
import './App.css';

class App extends Component {
  render() {
    console.log(window.location);
    return (
      <HashRouter>
        <div>
        <Nav />
          <Switch>
            <Route exact path="/" component={Welcome} />
            <Route path="/forum" component={Forum} />
            <Post path="/new" component={Post}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
