import React from 'react'

export default class ScriptCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="tile is-parent is-4" onClick={this.props.onClick}>
        <article className="tile is-child box">
          <p className="subtitle">{this.props.title}</p>
          <div className="content">
          <p>{this.props.content.slice(0,120) + (this.props.content.length < 117 ? "" : "...")}</p>
          </div>
        </article>
      </div>
    )
  }
}