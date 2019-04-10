import React from 'react'
import { Link } from 'react-router-dom';
import { recordAudio } from "./Audio";
import localforage from 'localforage';
import 'regenerator-runtime/runtime';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import { Auth } from 'aws-amplify';
import axios from 'axios';

const url = process.env.NODE_ENV == "development" ? "" : "http://localhost:8080";
class RunScript extends React.Component {

    constructor(props) {
        super(props);

        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.playRecording = this.playRecording.bind(this);
        this.saveRecordingLocally = this.saveRecordingLocally.bind(this);
        this.saveRecordingToDevice = this.saveRecordingToDevice.bind(this);
        this.download = React.createRef();
        this.applyKaraoke = this.applyKaraoke.bind(this)
        this.isSpeechMatch = this.isSpeechMatch.bind(this)
        this.startStopWatch = this.startStopWatch.bind(this)
        this.stopStopWatch = this.stopStopWatch.bind(this)
        this.calcWordsPerMinute = this.calcWordsPerMinute.bind(this)


        this.state = {
            recordingActive: true,
            recordingLoaded: false,
            recognizedSpeech: '',
            title: '',
            content: [],
            allWords: [],
            user: '',
            readScript: [],
            readIndex: 0,
            scriptToRead: [],
            notReadScript: [],
            scriptInput: [],
            isAlreadyMatched: false,
            speechLength: 0,
            translationCount: 0,
            time: 0,     //  The default time of the timer
            recordedMinute: 0,
            recordedSecond: 0,
            wordsPerMinute: 0,
            isLastSentence: false,
            speechCompletion: "No"
        }

        localforage.config({
            driver      : localforage.WEBSQL, // Force WebSQL; same as using setDriver()
            name        : 'Teleprompter',
            version     : 1.0,
            size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'Script_Audio', // Should be alphanumeric, with underscores.
            description : 'Audio for script'
        });

        this.store = localforage.createInstance({
            name: "scriptAudio"
          });
    }

    componentDidMount() {
        this.setState({
            recordingActive: false,
            recordingLoaded: false,
        });
        Auth.currentAuthenticatedUser()
            .then(user => {
                this.setState({ user: user.username });
                console.log(user.username);
                axios.get(url + '/api/' + this.state.user + '/scripts/' + this.props.match.params.id)
                    .then(scripts => {
                        console.log(scripts.data[0]);
                        this.setState({
                            title: scripts.data[0].title,
                            content: scripts.data[0].content.split(/([.!\n]+)\1*/g),
                            allWords: scripts.data[0].content.split(/(?=\s+)/),
                            scriptToRead: scripts.data[0].content.split(/([.!\n]+)\1*/g).slice(0, 2),
                            //includes regex to tokenize punctuation like .! and then newline
                            notReadScript: scripts.data[0].content.split(/([.!\n]+)\1*/g).slice(2)
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            });

        this.minute = 0;
        this.second = 0;
        this.timer_id;    //    This is used by setInterval function
        this.refs.resultSection.style.display = 'none';
        this.refs.practiceSection.style.display = 'block';

    }


    startStopWatch(interval) {
        interval = (typeof (interval) !== 'undefined') ? interval : 1000;
        this.timer_id = setInterval(() => {
            if (this.state.time < 3600) //if time is less than an hour
            {
                this.state.time++;
                this.second = this.state.time % 60;
                this.minute = Math.floor(this.state.time / 60) % 60;
                this.second = (this.second < 10) ? '0' + this.second : this.second;
                this.minute = (this.minute < 10) ? '0' + this.minute : this.minute;

                if (typeof (callback) === 'function') callback(this.state.time);
            }

        }, interval);

    }


    async startRecording() {
        this.recorder = await recordAudio();
        this.recorder.mimeType = "audio/wav";
        this.setState({
            recordingActive: true,
            recordingLoaded: false,
            isLastSentence: false,
            readScript: "",
            scriptToRead: this.state.content.slice(0, 2),
            notReadScript: this.state.content.slice(2),
            readIndex: 0,
            wordsPerMinute: 0,
            recordedMinute: 0,
            recordedSecond: 0,
            speechCompletion: "No"

        });

        this.refs.scriptBody.style.transform = "translateY(" + 0 + "px)";
        this.refs.resultSection.style.display = 'none';
        this.refs.practiceSection.style.display = 'block';

        this.startStopWatch(1000)
        this.recorder.start()
        fetch('https://teleprompter-store-token.herokuapp.com/')
            .then((response) => response.text())
            .then((token) => {
                this.stream = recognizeMicrophone({
                    token: token,
                    objectMode: false, // send objects instead of text
                    extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
                    format: false, // optional - performs basic formatting on the results such as capitals an periods
                    mediaStream: this.recorder.stream,
                    continuous: false
                });
                this.stream.on('data', (data) => {
                    const speechWords = data.alternatives[0].transcript
                    const scriptWords = this.state.content[this.state.readIndex]


                    if (this.state.isLastSentence == false) {
                        const isSpeechMatch = this.isSpeechMatch(speechWords, scriptWords)
                        if (isSpeechMatch == true) {
                            this.applyKaraoke()
                        }
                    }
                });
                this.stream.on('error', (err) => {
                    console.log(err);
                });
            }).catch(function (error) {
                console.log(error);
            });

    }

    isSpeechMatch(string1, string2) {
        if (string2 == null || string2 == 'undefined') {
            return false
        }
        // Returns Jaro Distance
        let l1 = string1.length,
            l2 = string2.length,
            matchedIndexes = [],
            matchedIndexes2 = [],
            numberMatched = 0,
            transpositions = 0,
            halfTranspositions = 0,
            maxDistance = Math.floor(Math.max(l1, l2) / 2) - 1,
            jd = 0; // jaro distance

        let inDistance = (distance) => {
            if (distance <= maxDistance) {
                return true;
            } else {
                return false;
            }
        }

        // count the matches
        let getMatching = (topString, bottomString) => {
            // first time calling this function
            // matches will be empty...  The second time we 
            // just need to do a basic comparison
            var tsLength = topString.length,
                bsLength = bottomString.length,
                tempMatchedIndexes = [],
                matches = [];

            for (var a = 0; a < tsLength; a++) {
                var matchFound = (function () {
                    for (var b = 0; b < bsLength; b++) {
                        if (topString[a] === bottomString[b]) {
                            //string1[a] and string2[b] match
                            if (tempMatchedIndexes.indexOf(b) === -1) {
                                // index b has not been indexed yet
                                if (inDistance(Math.abs(a - b))) {
                                    // the character is within distnace
                                    tempMatchedIndexes.push(b);
                                    matches.push(topString[a]);
                                    return true;
                                } else {
                                    return false;
                                }
                            } else {
                                //ALREADY BEEN INDEXED	
                            }
                        }
                    }
                    return false;
                }());
                if (!matchFound) {
                    tempMatchedIndexes.push("-");
                }
            }
            return matches;

        }
        matchedIndexes = getMatching(string1, string2);
        matchedIndexes2 = getMatching(string2, string1);
        numberMatched = matchedIndexes.length;

        for (let a = 0; a < numberMatched; a++) {
            if (matchedIndexes[a] !== matchedIndexes2[a]) {
                halfTranspositions++;
            }
        }

        transpositions = halfTranspositions / 2;
        jd = ((numberMatched / l1) + (numberMatched / l2) + ((numberMatched - transpositions) / numberMatched)) / 3;
        console.log("voice input " + string1 + " actual input " + string2 + " jd " + jd)

        const matchPercentage = jd

        if (string2.length < 9 && matchPercentage > 0.55) { //smaller worlds should get lower minimum matches
            console.log("readindex  " + this.state.readIndex + "  content lenght  " + this.state.content.length)
            if (this.state.readIndex + 2 >= this.state.content.length) {
                (async () => {
                    this.setState({
                        recordingActive: false,
                        recordingLoaded: true,
                        recordedMinute: this.minute,
                        recordedSecond: this.second,
                        speechCompletion: "Yes"
                    });
                    this.audio = await this.recorder.stop();
                    this.stream.stop();
                    this.stopStopWatch()
                    this.calcWordsPerMinute()
                    axios.post(url+'/api/'+this.state.user+'/metrics/add', {
                        scriptID: this.props.match.params.id,
                        duration: this.state.time,
                        wordsPerMinute: this.state.wordsPerMinute,
                        speechFinished: this.state.speechCompletion == "Yes" ? 1 : 0,
                        saveTime:new Date().toJSON().slice(0, 19).replace('T', ' '),
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                })();
                this.stopRecording;
            }
            return true
        }
        else if (string2.length > 9 && matchPercentage > 0.75) { //longer words should have a tougher time to match
            if (this.state.readIndex + 2 >= this.state.content.length) {
                (async () => {
                    this.setState({
                        recordingActive: false,
                        recordingLoaded: true,
                        recordedMinute: this.minute,
                        recordedSecond: this.second,
                        speechCompletion: "Yes"
                    });
                    this.audio = await this.recorder.stop();
                    this.stream.stop();
                    this.stopStopWatch()
                    this.calcWordsPerMinute()
                    axios.post(url+'/api/'+this.state.user+'/metrics/add', {
                        scriptID: this.props.match.params.id,
                        duration: this.state.time,
                        wordsPerMinute: this.state.wordsPerMinute,
                        speechFinished: this.state.speechCompletion == "Yes" ? 1 : 0,
                        saveTime:new Date().toJSON().slice(0, 19).replace('T', ' '),
                    })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })();



            }
            return true
        }
        return false;
    };



    applyKaraoke() {
        if (this.state.readIndex + 2 == this.state.content.length) {
            this.state.isLastSentence = true
            this.setState({
                speechCompletion: "Yes"
            });
        }

        if (this.state.readIndex > 3) {
            this.state.translationCount += -25;
            this.refs.scriptBody.style.transform = "translateY(" + this.state.translationCount + "px)";
        }
        const toAdd = this.state.readIndex + 2
        const toRead = toAdd + 2
        this.setState({
            readScript: this.state.content.slice(0, toAdd),
            scriptToRead: this.state.content.slice(toAdd, toRead),
            notReadScript: this.state.content.slice(toRead, this.state.content.length),
            readIndex: toAdd,
        });
    }

    stopStopWatch() {
        clearInterval(this.timer_id);
        this.second = 0;
        this.minute = 0;
        this.time = 0;
    }

    async stopRecording() {
        this.setState({
            recordingActive: false,
            recordingLoaded: true,
            recordedMinute: this.minute,
            recordedSecond: this.second
        });
        this.audio = await this.recorder.stop();
        this.stream.stop();
        this.stopStopWatch();
        this.calcWordsPerMinute();
        axios.post(url+'/api/'+this.state.user+'/metrics/add', {
            scriptID: this.props.match.params.id,
            duration: this.state.time,
            wordsPerMinute: this.state.wordsPerMinute,
            speechFinished: this.state.speechCompletion == "Yes" ? 1 : 0,
            saveTime:new Date().toJSON().slice(0, 19).replace('T', ' '),
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    calcWordsPerMinute() {
        this.refs.practiceSection.style.display = 'none';
        this.refs.resultSection.style.display = 'block';

        console.log(this.state.recordedSecond)
        this.setState({
            wordsPerMinute: Math.round(this.state.allWords.length / (this.state.time / 60))
        });
        console.log(this.state.wordsPerMinute)

    }
    playRecording() {
        this.audio.play();
    }

    saveRecordingLocally() {
        this.store.setItem(this.state.title, this.audio.audioUrl);
    }

   /* getRecordingTesting() {
        var file = this.storeRecordings.getItem(this.state.title)
        console.log(file)
    }*/

    saveRecordingToDevice() {
        var file = this.audio.audioUrl
        var fileName = this.state.title
        if (!file) {
            throw 'Blob object is required.';
        }

        if (!file.type) {
            try {
                file.type = 'audio/wav';
            } catch (e) { }
        }

        var fileExtension = (file.type || 'audio/wav').split('/')[1];

        if (fileName && fileName.indexOf('.') !== -1) {
            var splitted = fileName.split('.');
            fileName = splitted[0];
            fileExtension = splitted[1];
        }

        var fileFullName = (fileName) + '.' + fileExtension;

        if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
            return navigator.msSaveOrOpenBlob(file, fileFullName);
        } else if (typeof navigator.msSaveBlob !== 'undefined') {
            return navigator.msSaveBlob(file, fileFullName);
        }

        var hyperlink = document.createElement('a');
        hyperlink.href = this.audio.audioUrl
        hyperlink.download = fileFullName;

        hyperlink.style = 'display:none;opacity:0;color:transparent;';
        (document.body || document.documentElement).appendChild(hyperlink);

        if (typeof hyperlink.click === 'function') {
            hyperlink.click();
        } else {
            hyperlink.target = '_blank';
            hyperlink.dispatchEvent(new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            }));
        }

        URL.revokeObjectURL(hyperlink.href);

    }

    render() {
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">Run Script</Link></li>
                    </ul>
                </nav>
                <div className="container is-fluid">

                    <div className="button-controls is-half is-offset-one-quarter">
                        <input className="button is-primary is-small" type="button" value="Start Recording" disabled={this.state.recordingActive} onClick={this.startRecording} />
                        <input className="button is-primary is-small" type="button" value="Stop Recording" disabled={!this.state.recordingActive} onClick={this.stopRecording} />
                        <input className="button is-primary is-small" type="button" value="Play Recording" disabled={!this.state.recordingLoaded} onClick={this.playRecording} />
                        <input className="button is-primary is-small" type="button" value="Save Recording Locally" disabled={!this.state.recordingLoaded} onClick={this.saveRecordingLocally} />
                        <input className="button is-primary is-small" type="button" ref={this.downlaod} value="Save Recording To Computer" disabled={!this.state.recordingLoaded} onClick={this.saveRecordingToDevice} />
                    </div>

                    <div ref="practiceSection" className="tile is-ancestor is-12 has-text-centered is-not-stats notification">
                        <div className="tile is-vertical">
                            <div className="tile is-parent">
                                <article className="tile input-article is-child">
                                    <div>
                                        <span className="title-output">{this.state.title}</span>
                                    </div>
                                    <div className="script-container">
                                        <div ref="scriptBody" className="animation">
                                            <span className="read-script"> {this.state.readScript}  </span>
                                            <span className="script-to-read">{this.state.scriptToRead}</span>
                                            <span className="not-read-content">{this.state.notReadScript}  </span>
                                        </div>
                                    </div>
                                </article>

                            </div>
                        </div>
                    </div>
                    <div ref="resultSection" className="tile is-ancestor is-12 has-text-centered is-stats">
                        <div className="tile is-vertical">
                            <div className="tile is-parent">
                                <article className="tile is-child">
                                    <p className="stats-title">Statistics</p>
                                    <div className="content">
                                        <div> <span className="stats-type">Speech Time:</span> <span className="stats-content">{this.state.recordedMinute}:{this.state.recordedSecond}</span></div>
                                        <div><span className="stats-type">Words per Minute:</span> <span className="stats-content">{this.state.wordsPerMinute}</span></div>
                                        <div><span className="stats-type">Speech Fully Completed:</span> <span className="stats-content">{this.state.speechCompletion}</span></div>
                                    </div>
                                </article>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RunScript