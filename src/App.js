import React, { Component } from 'react';
import {HashRouter, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Forum from './components/Forum/Forum';
import Welcome from './components/Welcome/Welcome';
import NewPost from './components/NewPost/NewPost';
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
            <NewPost path="/new" component={NewPost}/>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
