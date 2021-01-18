import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import NavBar from "../../Components/UI/NavBar/NavBar";
import Home from "../Home/Home";
import Users from "../Users/Users";
import Jobs from "../Jobs/Jobs";

import {
	HomeOutlined,
	UserOutlined,
	AimOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";

const navBarConfig = {
	defaultSelected: "home",
	options: [
		{
			key: "home",
			text: "Home",
			path: "/",
			icon: <HomeOutlined />,
		},
		{
			key: "users",
			text: "Users",
			path: "/users",
			icon: <UserOutlined />,
		},
		{
			key: "jobs",
			text: "Jobs",
			path: "/jobs",
			icon: <AimOutlined />,
		},
		{
			key: "about",
			text: "About",
			path: "/about",
			icon: <InfoCircleOutlined />,
		},
	],
};

const Routes = (props) => {
	const [selectedTab, setSelectedTab] = useState(navBarConfig.defaultSelected);

	return (
		<React.Fragment>
			<Router>
				<NavBar config={navBarConfig} selectedTab={selectedTab}></NavBar>
				<Switch>
					<Route
						path="/"
						exact
						component={() => {
							setSelectedTab("home");
							return <Home></Home>;
						}}
					/>
					<Route
						path="/users"
						exact
						component={() => {
							setSelectedTab("users");
							return <Users></Users>;
						}}
					/>
					<Route
						path="/jobs"
						exact
						component={() => {
							setSelectedTab("jobs");
							return <Jobs></Jobs>;
						}}
					/>
					<Route
						path="/about"
						exact
						component={() => {
							window.open(
								"https://web.torre.co/about-torre?_ga=2.184021094.1912944284.1610807779-134964990.1610509679"
							);
							setSelectedTab(navBarConfig.defaultSelected);
							return <Redirect to="/" />;
						}}
					/>
					<Redirect to="/" />
				</Switch>
			</Router>
		</React.Fragment>
	);
};

export default Routes;
