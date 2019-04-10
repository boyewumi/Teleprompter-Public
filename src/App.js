import React from 'react'
import {hot} from 'react-hot-loader';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import ScriptRunner from "./RunScript";
import Input from "./ScriptInput";
import History from "./ScriptHistory";
import Recordings from "./VoiceRecordings";
import Practices from "./BestPractices";
import Analytics from "./Analytics";
import About from "./About";
import EditScript from "./EditScript";
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

const MyTheme = {
  button: { 'backgroundColor': '#f62459' },
  input: {'outlineColor': '#f62459'},
  select: {'outlineColor': '#f62459'},
  a: {'color': '#f62459'},
}

class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="columns is-fullheight">
            <aside className="menu column is-2">
                <div>
                <ul className="menu-list">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/history">Recent Scripts</Link></li>
                  <li><Link to="/recordings">Recordings</Link></li>
                  <li><Link to="/practices">Best Practices</Link></li>
                  <li><Link to="/analytics">Analytics</Link></li>
                  <li><Link to="/about">About</Link></li>
                  <li><a onClick={() => Auth.signOut().then(() => {this.props.onStateChange('signedOut', null);}).catch(err => {console.log('err: ', err)})}>Logout</a></li>
                </ul>
                </div>
            </aside>
            <div className="column is-10 has-text-centered">
              <Route exact path="/" component={Input} />
              <Route path="/run/:id" component={ScriptRunner} />
              <Route path="/history" component={History} />
              <Route path="/recordings" component={Recordings} />
              <Route path="/practices" component={Practices} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/about" component={About} />
              <Route path="/editScript/:id" component={EditScript} />
            </div>
          </div>
        </Router>
    )
  }
}

export default withAuthenticator(hot(module)(App),false, [], null, MyTheme);