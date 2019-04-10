import React from 'react'
import localforage from 'localforage';
import { Link } from 'react-router-dom';

export default class VoiceRecordings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: ""
        }
        localforage.config({
            driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
            name: 'Teleprompter',
            version: 1.0,
            size: 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName: 'Script_Audio', // Should be alphanumeric, with underscores.
            description: 'Audio for script'
        });

        this.store = localforage.createInstance({
            name: "scriptAudio"
        });
    }

    componentDidMount() {
        this.fileArr = []

        this.store.getItem("Hello")
        .then(result => {
            this.setState({file: result});
        });


    }

    render() {
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">Recordings</Link></li>
                    </ul>
                </nav>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="subtitle">Script #1 Title</p>
                            <div className="content">
                            <audio  src={this.state.file} controls/>
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="title">Script #2 Title</p>
                            <div className="content">
                                <p>Placeholder for Script Audio Player</p>
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="title">Script #3 Title</p>
                            <div className="content">
                                <p>Placeholder for Script Audio Player</p>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="tile is-ancestor">
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="title">Script #4 Title</p>
                            <div className="content">
                                <p>Placeholder for Script Audio Player</p>
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="title">Script #5 Title</p>
                            <div className="content">
                                <p>Placeholder for Script Audio Player</p>
                            </div>
                        </article>
                    </div>
                    <div className="tile is-parent is-4">
                        <article className="tile is-child box">
                            <p className="title">Script #6 Title</p>
                            <div className="content">
                                <p>Placeholder for Script Audio Player</p>
                            </div>
                        </article>
                    </div>
                </div>
            </div>

        )
    }
}