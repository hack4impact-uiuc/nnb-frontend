import React, { Component } from 'react'
//import ReactDOM from 'react-dom'

//import Header from '.InfoPanel/Header'
//import Footer from '.InfoPanel/Footer'

// import styles from './styles/react.js'

//function Panel(props) {
//	return {
//		<button className="panel" onClick={props.onClick}>
//			{props.value}/>
//	}
//}
class InfoPanel extends React.Component {
  renderPanel(i) {
    return (
      <Panel
        value={this.props.panel[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  onClick() {
    // 	const title = {selectedEvent.title}
    //	const coordinates = [
    //		{selectedEvent.coordinateY} -
    //		{selectedEvent.coordinateX}
    //	]
    // }
  }

  handleClick = () => {
    const history = this.state
    const current = current.panel
  }

  render() {
    const selectedEvent = this.props.selectedEvent
    const img_url = selectedEvent.image
    return (
      <div classname="InfoPanel">
        <h1> {selectedEvent.title} </h1>
        <div className="Top-section">
          <h3 className="Mid-intro"> {selectedEvent.description}</h3>
          {selectedEvent.date}
          {selectedEvent.coordinateX}
          {selectedEvent.coordinateY}
          <img src="{selectedEvent.image}" alt="H4I image" />
          {selectedEvent.links}
          onClick={this.onClick}
        </div>
      </div>
    )
  }
}

//const app = document.getElementByID();

export default InfoPanel
