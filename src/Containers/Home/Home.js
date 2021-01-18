import React from "react";
import { Button, Row, Col, Typography, Space } from "antd";
import HomeImage from "../../Assets/Images/torre-logo.png";
import { useHistory } from "react-router-dom";
import "./Home.less";
import {
	UserOutlined,
	AimOutlined,
} from "@ant-design/icons";
const { Title } = Typography;

const Home = (props) => {
	const history = useHistory();
	return (
		<React.Fragment>
			<Row className="homepage-container" justify="center" align="middle">
				<Col span={20}>
						<Row justify="center" className="align-center-h">
							<Col xs={24}>
								<img
									className="homepage-img"
									src={HomeImage}
									alt={"Homepage"}
								></img>
								<Title>The Next-Generation Professional Network</Title>
							</Col>
						</Row>
						<Row
							justify="center"
							className="align-center-h homepage-btn-section"
						>
							<Col xs={6} span={6}>
								<Button
									className="homepage-btn"
									type="primary"
									shape="round"
									icon={<UserOutlined />}
									size={"large"}
									onClick={() => redirectTo(history, "users")}
								>
									<span className="btn-text-title">Users</span>
								</Button>
							</Col>
							<Col xs={6} span={6}>
								<Button
									className="homepage-btn"
									type="primary"
									shape="round"
									icon={<AimOutlined />}
									size={"large"}
									onClick={() => redirectTo(history, "jobs")}
								>
									<span className="btn-text-title">Jobs</span>
								</Button>
							</Col>
						</Row>
				</Col>
			</Row>
		</React.Fragment>
	);
};

const redirectTo = (history, section) => {
	history.push("/" + section);
	console.log("Done");
}

export default Home;
