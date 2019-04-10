import React from 'react'
import { Link } from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import {Auth} from 'aws-amplify';
import {Line} from 'react-chartjs-2';

const url = process.env.NODE_ENV == "development" ? "" : "http://localhost:8080";

export default class Analytics extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user: '',
            data:{},
        }
    }
    componentDidMount(){
        var data = [];
        var labels = [];
        Auth.currentAuthenticatedUser()
        .then(user => {
            this.setState({user: user.username});
            axios.get(url+'/api/'+this.state.user+'/metrics')
            .then(metrics => {
                metrics.data.map((metric,i) => {
                    data.push(metric.wordsPerMinute);
                    labels.push(i);
                });
                this.setState({data : {labels:labels,datasets:[{label:"Words per minute",data:data,fill:false,borderColor:'red'}]}});
            });
        })
        .catch(err => console.log(err));
    }
    render() {
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">Analytics</Link></li>
                    </ul>
                </nav>
                <Line data={this.state.data} height={500} width={700} />
            </div>

        )
    }
}