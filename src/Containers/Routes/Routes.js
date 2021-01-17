import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from "react-router-dom";
import Home from "../Home/Home";
import NavBar from "../../Components/UI/NavBar";
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
					<Route path="/" exact component={Home} />
					<Route
						path="/about"
						component={() => {
							window.open(
								"https://web.torre.co/about-torre?_ga=2.184021094.1912944284.1610807779-134964990.1610509679"
							);
							console.log("Done");
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
