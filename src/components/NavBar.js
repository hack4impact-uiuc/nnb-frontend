import React, { PureComponent } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Icon } from './'

class NavBar extends PureComponent {
  render() {
    const {
      isStorySelected,
      selectedStoryName,
      startYear,
      endYear
    } = this.props
    const contextYears = `${startYear} - ${endYear}`
    return (
// <<<<<<< redux-2
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <div className="sidebar-menu" onClick={this.toggleSidebar} />
            {/* NNB */}
            <Link to="/">NNB</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <ToggleButtonGroup
          type="checkbox"
          value={this.props.isEditing ? [1] : []}
          onChange={this.props.onEdit}
        >
          {this.props.showEdit && <ToggleButton value={1}>Edit</ToggleButton>}
// =======
//       <Navbar>
//         <div className="navbar-content">
//           <Icon
//             type="Menu"
//             size="large"
//             onClick={this.props.toggleSidebar}
//             className="navbar-content__item"
//           />
//           <div className="navbar-content__item navbar-content__title ">NNB</div>
//           <div className="navbar-content__item-context navbar-content__context ">
//             Now Viewing:
//           </div>
//           {isStorySelected && (
//             <div className="navbar-content__item-context navbar-content__context-story-name ">
//               {selectedStoryName}:
//             </div>
//           )}
//           <div className="navbar-content__item-context navbar-content__context-years ">
//             {contextYears}
//           </div>
//           {this.props.showEdit && (
//             <div className="navbar-content__item" onClick={this.props.onEdit}>
//               {this.props.isEditing ? 'Disable Editing' : 'Enable Editing'}
//             </div>
//           )}
// >>>>>>> master
          <Link to="/login">
            <div className="navbar-content__item">Login</div>
          </Link>
        </div>
      </Navbar>
    )
  }
}

export default NavBar
