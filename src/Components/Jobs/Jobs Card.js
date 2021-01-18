import React from "react";
import { Skeleton, Card, Avatar, Typography, Tag } from "antd";
import DefaultBusinessLogo from "../../Assets/Images/default-business-logo.png";
import "./Jobs Cards.less";

const { Meta } = Card;
const { Title, Text } = Typography;

const JobsCard = (props) => {
	const { objective, organizations, skills, type, locations } = props;

	const org = {}
	if(organizations !== null && organizations.length > 0){
		org.name = organizations[0].name; 
		org.picture = organizations[0].picture; 
	}else{
		org.name = "Desconocido";
		org.picture = DefaultBusinessLogo;
	}

	const description = (
		<React.Fragment>
			<Text type="secondary">{org.name}</Text>
			<br></br>
			{props.skills !== null
				? props.skills.map((skill, index) => {
						if (index <= 3) {
							return (
								<React.Fragment>
									<Tag color="blue">{skill.name}</Tag>
								</React.Fragment>
							);
						} else {
							return null;
						}
				  })
				: ""}
		</React.Fragment>
	);

	return (
		<Card style={{ width: "90%", margin: "10px auto" }} hoverable>
			<Skeleton loading={false} avatar active>
				<Meta
					className="jobs-card-content"
					avatar={
						<Avatar
							src={org.picture}
						/>
					}
					title={objective != null ? objective : ""}
					description={description}
				/>
			</Skeleton>
		</Card>
	);
};

export default JobsCard;