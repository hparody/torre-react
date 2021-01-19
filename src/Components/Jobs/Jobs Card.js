import React from "react";
import { Skeleton, Card, Avatar, Typography, Tag, Divider, Button } from "antd";
import DefaultBusinessLogo from "../../Assets/Images/default-business-logo.png";
import "./Jobs Cards.less";
import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { Text } = Typography;

const JobsCard = (props) => {
	const {
		objective,
		organizations,
		skills,
		type,
		locations,
		remote,
		id,
	} = props;

	const org = {};
	if (organizations !== null && organizations.length > 0) {
		org.name = organizations[0].name;
		org.picture = organizations[0].picture;
	} else {
		org.name = "Empresa Anónima";
		org.picture = DefaultBusinessLogo;
	}

	const jobType = {
		advising: "Advising",
		"freelance-gigs": "Freelance Gigs",
		"full-time-employment": "Full Time Employment",
		hiring: "Hiring",
		internships: "Internship",
		mentoring: "Mentoring",
		"part-time-employment": "Part Time Employment",
	};

	const description = (
		<React.Fragment>
			<Text type="secondary">{org.name}</Text>
			<br></br>
			{remote !== null && remote === true ? (
				<React.Fragment>
					<Tag icon={<CheckCircleOutlined />} color="success">
						Remote
					</Tag>
				</React.Fragment>
			) : (
				""
			)}
			{type !== null ? (
				<React.Fragment>
					<Tag icon={<ClockCircleOutlined />} color="default">
						{jobType[type]}
					</Tag>
				</React.Fragment>
			) : (
				""
			)}
			<br></br>
			{skills !== null && skills.length > 0 ? (
				<React.Fragment>
					<Divider orientation="left" className="card-divider">
						Skills
					</Divider>
					{skills.map((skill, index) => {
						if (index <= 5) {
							return (
								<React.Fragment>
									<Tag color="blue">{skill.name}</Tag>
								</React.Fragment>
							);
						} else {
							return null;
						}
					})}
				</React.Fragment>
			) : (
				""
			)}
		</React.Fragment>
	);

	return (
		<Card
			style={{ width: "90%", margin: "10px auto" }}
			hoverable
			onClick={() => {
				window.open("https://torre.co/jobs/" + id, "_blank");
			}}
		>
			<Skeleton loading={false} avatar active>
				<Meta
					className="jobs-card-content"
					avatar={<Avatar src={org.picture} />}
					title={objective != null ? objective : ""}
					description={description}
				/>
			</Skeleton>
		</Card>
	);
};

export default JobsCard;
