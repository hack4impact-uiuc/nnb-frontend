import React, { Component } from 'react'

class InfoPanelItem extends Component {
  constructor(props) {
    super(props)

    this.handleShowClick = this.handleShowClick.bind(this)
    this.handleHideClick = this.handleHideClick.bind(this)

    this.state = { expanded: false }
  }

  handleShowClick() {
    this.setState({ expanded: true })
  }

  handleHideClick() {
    this.setState({ expanded: false })
  }

  render() {
    const stGlobal = {
      width: '96%',
      margin: '0.3em 2%',
      display: 'inline-block'
    }

    const stHead = {
      padding: '16px 24px',
      background: '#11122F',
      color: 'white',
      border: 'none',
      fontSize: '140%',
      textAlign: 'left'
    }

    const stDrop = {
      padding: '16px 24px',
      background: 'rgba(17, 18, 47, 0.42)',
      color: 'white',
      fontWeight: '200',
      fontSize: '1.3em'
    }

    const stEx = {
      // the plus/minus signs
      float: 'right',
      display: 'inline-block',
      fontWeight: 'bold',
      lineHeight: '65%', // this has to be eyeballed
      fontSize: '150%'
    }

    const expanded = this.state.expanded

    let button = null
    let body = null
    let expand = null
    let listener = null

    let ru = '6px '
    let rn = '0px '

    if (expanded) {
      stHead.borderRadius = ru + ru + rn + rn
      stDrop.borderRadius = rn + rn + ru + ru

      listener = this.handleHideClick
      button = <span>{this.props.header}</span>
      body = (
        <div className="page-body" style={stDrop}>
          {this.props.children}
        </div>
      )
      expand = <span style={stEx}>–</span>
    } else {
      stHead.borderRadius = ru + ru + ru + ru

      listener = this.handleShowClick
      button = <span>{this.props.header}</span>
      expand = <span style={stEx}>+</span>
    }

    return (
      <div style={stGlobal}>
        <div onClick={listener} style={stHead}>
          {button}
          {expand}
        </div>
        {body}
      </div>
    )
  }
}

class InfoPanel extends Component {
  render() {
    const selectedEvent = this.props.selectedEvent
    const img_url = selectedEvent.image

    const column = {
      width: '50%',
      display: 'inline-block'
    }

    let tags = [
      { topic: 'Description', description: 'This is POI 1' },
      { topic: 'Date', description: '1509596783675' },
      { topic: 'Link 1', description: 'https://www.google.com' },
      { topic: 'Link 2', description: 'https://www.espn.com' },
      { topic: 'Link 3', description: 'http://www.facebook.com' }
    ]

    let listItems = tags.map(item => {
      return (
        <InfoPanelItem header={item.topic}>{item.description}</InfoPanelItem>
      )
    })

    return (
      <div classname="InfoPanel">
        <h1>
          {' '}
          <u>
            <b>{selectedEvent.title} </b>
          </u>{' '}
        </h1>
        <div className="Top-section">
          <div className="InfoPanel">
            <h2>
              <img src="{selectedEvent.image}" alt="H4I image" />
            </h2>
            <img src="h4iimage.jpg" alt="H4I image not loaded" />
            {listItems}
            <h2>CoordinateX: {selectedEvent.coordinateX}</h2>
            <h2>CoordinateY: {selectedEvent.coordinateY}</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default InfoPanel
