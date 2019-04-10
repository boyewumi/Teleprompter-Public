import React from 'react'
import { Link } from 'react-router-dom';

export default class About extends React.Component {
    render() {
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">About</Link></li>
                    </ul>
                </nav>
                <div>
                    <article className="aboutContent">
                        <p className="subtitle is-2">About Teleprompter</p>
                        <br></br>
                        <p className="aboutInfo">Communication is the backbone of our society. It allows us to form connections, influence decisions, and motivate change. Without communication skills, the ability to progress in the working world and in life, itself, would be nearly impossible.</p>
                        <br></br>
                        <p className="aboutInfo">Public speaking is one of the most important and most dreaded forms of communication. Glossophobia or speech anxiety is the most common fear people have across the globe. Throughout primary school, it is easy to be the student who sits in the back of the classroom and avoids raising his or her hand to dodge such situations. &nbsp;But in the working world, public speaking is a vital skill to have and to hone. It effects simple, everyday interactions between coworkers, bosses and employees, marketing professionals and clients, etc., and it can have an enormous impact on your career path and your level of success in your industry.</p>
                        <br></br>
                        <p className="aboutInfo">This Teleprompter application built by Babalakin Oyewumi and Aman Dhiman aims to help people who are seeking to practice their public speaking skills in hopes of improving it. Teleprompter allows users to add their speech script, practice vocalizing the script via speech to text recognition and finally delivering metrics based on different components of the speech execution.</p>
                    </article>
                </div>
            </div>

        )
    }
}