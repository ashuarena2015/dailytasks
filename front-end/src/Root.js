import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Login from './Login';
import SideMenu from './SideMenu';
import Dashboard from './Dashboard';
import Report from './Reports';


const Root = () => {
	return (
		<HashRouter>
			<SideMenu />
			<Switch>
				<Route
					exact
					path="/"
					component={
						Login
					}
				/>
				<Route
					exact
					path="/dashboard"
					component={
						Dashboard
					}
				/>
				<Route
					exact
					path="/report"
					component={
						Report
					}
				/>
			</Switch>
		</HashRouter>
	);
};

export default Root;
