import React from 'react'
import { Link } from 'react-router-dom';

export default class BestPractices extends React.Component {
    render() {
        return (
            <div>
                <nav className="breadcrumb" aria-label="breadcrumbs">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li className="is-active"><Link to="#" aria-current="page">Best Practices</Link></li>
                    </ul>
                </nav>
                <article className="information">

                    <p><span className="tableFormat userInfo is-4">The most important part of speech effectiveness is speech delivery.</span></p>
                    <p>&nbsp;</p>
                    <p><span className="tableFormat subtitle">What impacts speech delivery:</span></p>
                    <ul>
                        <li className="tableFormat"><span className="tableFormat">Pauses</span></li>
                        <li className="tableFormat"><span className="tableFormat">Raising of the voice</span></li>
                        <li className="tableFormat"><span className="tableFormat">Gestures</span></li>
                        <li className="tableFormat"><span className="tableFormat">Visual Aids</span></li>
                        <li className="tableFormat"><span className="tableFormat">Eye contact</span></li>
                    </ul>
                    <p>&nbsp;</p>
                    <div className="divTable">
                        <div className="divTableBody">
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">What Teleprompter helps with</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">What Teleprompter </span><strong>does not</strong><span className="tableFormat"> help with</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <ul>
                                        <li className="tableFormat"><span className="tableFormat">Pauses</span></li>

                                    </ul>
                                </div>
                                <div className="divTableCell">
                                    <ul>
                                        <li className="tableFormat"><span className="tableFormat">Raising of the voice</span></li>
                                        <li className="tableFormat"><span className="tableFormat">Gestures</span></li>
                                        <li className="tableFormat"><span className="tableFormat">Visual Aids</span></li>
                                        <li className="tableFormat"><span className="tableFormat">Eye contact</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><br /><br /><br /></p>
                    <p><span className="tableFormat subtitle">Variables that impact effective vs ineffective speech delivery by the speaker:</span></p>
                    <div className="divTable">
                        <div className="divTableBody">
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><strong>Variables</strong></p>
                                </div>
                                <div className="divTableCell">
                                    <p><strong>Effective</strong></p>
                                </div>
                                <div className="divTableCell">
                                    <p><strong>Ineffective</strong></p>
                                </div>
                                <div className="divTableCell">
                                    <p><strong>Does Teleprompter help with this variable?</strong></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Rate</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat"> 125-150 words per minute.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat"> Below 125 words per minute (Too Slow). Above 150 words per minute (Too Fast)</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Yes</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Volume</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Approximately 50 decibels (Normal Conversation)</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Approximately 20 decibels (Whisper)</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">No</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Voice Quality</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Pleasant, does not call attention to itself. Normal to Speaker.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Nasal, with vocal mechanisms tensed to produce harshness and upward pitch change in the voice.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">No</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Posture</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Feet 12 inches apart, one slightly ahead of the other. </span></p>
                                    <p><span className="tableFormat">Head erect, chin up, chest out, shoulders relaxed. </span></p>
                                    <p><span className="tableFormat">Standing on the ball of feet.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Feet 6 Inches apart, even with each other. Head lowered, shoulders stooped, back bent slightly forward. Standing on the flat fleet. Leaning and slouching.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">No</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Gesture</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Speaker used gestures spontaneously.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Absence of hand and arm gestures.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">No</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Body Movement</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Forward movements for emphasis, sideward movements for transitions as written into speech transcript.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Absence of body movements.</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">No</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><br /><br /></p>
                    <p><span className="tableFormat userInfo">Although the speaker&rsquo;s speech delivery is a big part of speech effectiveness. Speech effectiveness cannot be maximized without connecting to the receiver/s of the speech.</span></p>
                    <p>&nbsp;</p>
                    <p><span className="tableFormat subtitle">Variables that impact speech effectiveness from the receiver/s point of view: </span></p>
                    <p>&nbsp;</p>
                    <div className="divTable">
                        <div className="divTableBody">
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Variables</span></p>
                                </div>
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Definition</span></p>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Recall Comprehension</span></p>
                                </div>
                                <div className="divTableCell">
                                    <ul>
                                        <li className="tableFormat"><span className="tableFormat">Speech should be understood and remembered for at least a short length of time by the receiver</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Attitude Change</span></p>
                                </div>
                                <div className="divTableCell">
                                    <ul>
                                        <li className="tableFormat"><span className="tableFormat"> Speech should want to change the attitude of the receiver</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="divTableRow">
                                <div className="divTableCell">
                                    <p><span className="tableFormat">Ethos</span></p>
                                </div>
                                <div className="divTableCell">
                                    <ul>
                                        <li className="tableFormat"><span className="tableFormat">Speech must be believable for the receiver</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <div className="card">
                        <header className="card-header">
                            <p className="card-header-title">
                                References
    </p>
                        </header>
                        <div className="card-content">
                            <div className="content">
                                <p><span className="tableFormat">https://sajcd.org.za/index.php/sajcd/article/view/95/139</span></p>
                                <p><span className="tableFormat">https://sfx.scholarsportal.info/guelph?frbrVersion=2&amp;ctx_ver=Z39.88-2004&amp;ctx_enc=info:ofi/enc:UTF-8&amp;ctx_tim=2018-11-14T08%3A52%3A06IST&amp;url_ver=Z39.88-2004&amp;url_ctx_fmt=infofi/fmt:kev:mtx:ctx&amp;rfr_id=info:sid/primo.exlibrisgroup.com:primo3-Article-tayfranc&amp;rft_val_fmt=info:ofi/fmt:kev:mtx:journal&amp;rft.genre=article&amp;rft.atitle=Relationships%20between%20speech%20delivery%20and%20speech%20effectiveness&amp;rft.jtitle=Communication%20Monographs&amp;rft.btitle=&amp;rft.aulast=Gundersen&amp;rft.auinit=&amp;rft.auinit1=&amp;rft.auinitm=&amp;rft.ausuffix=&amp;rft.au=Gundersen,%20D.%20F.&amp;rft.aucorp=&amp;rft.date=1976-06-01&amp;rft.volume=43&amp;rft.issue=2&amp;rft.part=&amp;rft.quarter=&amp;rft.ssn=&amp;rft.spage=158&amp;rft.epage=165&amp;rft.pages=158-165&amp;rft.artnum=&amp;rft.issn=0363-7751&amp;rft.eissn=1479-5787&amp;rft.isbn=&amp;rft.sici=&amp;rft.coden=Communications%20Monographs,%20Vol.%2043,%20No.%202,%20June%201976,%20pp.%20158-165&amp;rft_id=info:doi/10.1080/03637757609375927&amp;rft.object_id=&amp;svc_val_fmt=info:ofi/fmt:kev:mtx:sch_svc&amp;rft.eisbn=&amp;rft_dat=%3Ctayfranc%3E10.1080/03637757609375927%3C/tayfranc%3E%3Cgrp_id%3E6531098382319262062%3C/grp_id%3E%3Coa%3E%3C/oa%3E%3Curl%3E%3C/url%3E&amp;rft_id=info:oai/&amp;req.language=eng&amp;rft_pqid=58068970</span></p>
                                <p>&nbsp;</p>
                            </div>
                        </div>

                    </div>

                </article>
            </div>

        )
    }
}