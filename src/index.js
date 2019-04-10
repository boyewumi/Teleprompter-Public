import React from 'react'
import { render } from 'react-dom'
import App from './App';
import './styles/style.scss'
import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

render(<div className="container is-fluid"><App /></div>, document.getElementById('root'))