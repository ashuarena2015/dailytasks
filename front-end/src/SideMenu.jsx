import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sideMenuOpen: false
		};
		this.openSideMenu = this.openSideMenu.bind(this);
	}

	openSideMenu() {
		this.setState(prevState => ({
			sideMenuOpen: !prevState.sideMenuOpen
		}));
	}

	render() {

		return (
			<div className="header">
				<div id="sidemenu">
					<div className={!this.state.sideMenuOpen ? 'menu-opener' : 'menu-opener menu-opener-active'} onClick={this.openSideMenu}><span className={!this.state.sideMenuOpen ? 'fa fa-bars fa-2x' : 'fa fa-arrow-left'} /></div>
				      <div className={!this.state.sideMenuOpen ? 'side-menu side-menu-hide' : 'side-menu side-menu-open'}>
						<div onClick={this.openSideMenu}>
							<ul>
								<li><Link to="/profile">My Profile</Link></li>
								<li><Link to="/report">Report</Link></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

  		);
  	}
}

export default SideMenu;
