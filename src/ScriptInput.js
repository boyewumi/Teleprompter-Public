import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Auth} from 'aws-amplify';

const url = process.env.NODE_ENV == "development" ? "" : "http://localhost:8080";
export default class EditScript extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user:'',
      title: '',
      content: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    Auth.currentAuthenticatedUser()
    .then(user => {
        this.setState({user: user.username});
        console.log(user.username);
    })
    .catch(err => console.log(err));
  }

  handleInput(event) {

    const target = event.target
    const targetName = event.target.name

    if (targetName == 'title') {
      this.setState({
        title: target.value
      });
    }

    if (targetName == 'content') {
      this.setState({
        content: target.value
      });
    }
    
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(url+'/api/'+this.state.user+'/scripts/add', {
      title: this.state.title,
      content: this.state.content,
      lastUsed:new Date().toJSON().slice(0, 19).replace('T', ' '),
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    
  
    this.props.history.push({
      pathname: '/history',
    })
  }

  render() {
    return (
      <div>
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li className="is-active"><Link to="#" aria-current="page">Home</Link></li>
          </ul>
        </nav>
        <div className="tile is-parent">
          <div className="tile is-child box">
            <p>
              Welcome to Teleprompter! An application that allows you to practice your speeches and develops your public
              speaking skills!
            </p>
          </div>
        </div>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title subtitle">
               Add Script</p>
          </header>
          <div className="card-content">
            <div className="content">
              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input required maxLength="35" className="input titleInput" name="title" type="text" placeholder="Script Title" value={this.state.title}
                      onChange={this.handleInput} />
                  </div>
                </div>

                <div>
                  <textarea required className="textarea" name="content" placeholder="Write your script here" value={this.state.content}
                    onChange={this.handleInput} >

                  </textarea>
                </div>
                <div className="submit-script">
                  <button className="button is-primary">
                    Submit
                        </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    )
  }
}