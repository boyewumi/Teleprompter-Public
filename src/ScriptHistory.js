import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import {Auth} from 'aws-amplify';
import _ from 'lodash';
import ScriptCard from './ScriptCard';

const url = process.env.NODE_ENV == "development" ? "" : "http://localhost:8080";
export default class ScriptHistory extends React.Component {
    constructor(props){
        super(props);
        this.state={
            scripts: [],
            user: '',
            chunks: [],
            redirected: false,
            selection:'',
        }
    }
    handleClick(id){
        this.setState({selection:id, redirected:true});
    }
    componentDidMount(){
        Auth.currentAuthenticatedUser()
        .then(user => {
            this.setState({user: user.username});
            axios.get(url+'/api/'+this.state.user+'/scripts')
            .then(scripts => {
                this.setState({scripts: scripts.data});
                this.setState({chunks: _.chunk(this.state.scripts,3)});
            });
        })
        .catch(err => console.log(err));
    }
    render() {
        if (this.state.redirected == true){
            return <Redirect to={"/editscript/"+this.state.selection} />
        }
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">Recent Scripts</Link></li>
                    </ul>
                </nav>
                {this.state.chunks.map((chunk,i) => {
                    return (<div key={i} className="tile is-ancestor">
                    {chunk.map((script,j) => {
                        return (<ScriptCard key={i+""+j} id={script.id} title={script.title} content={script.content} onClick={() => this.handleClick(script.id)}/>);
                    })}
                    </div>)
                })}
            </div>
        )
    }
}