import React from "react";
import { Skeleton, Card, Avatar, Typography, Tag } from "antd";
import DefaultAvatar from "../../Assets/Images/default-avatar.png";
import "./Users Cards.less";

const { Meta } = Card;
const { Title, Text } = Typography;

const UsersCard = (props) => {
	const description = (
		<React.Fragment>
			<Text>
				{props.professionalHeadline != null ? props.professionalHeadline : ""}
			</Text>
			<br></br>
			<Text type="secondary">
				{props.locationName != null ? props.locationName : ""}
			</Text>
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
					className="users-card-content"
					avatar={
						<Avatar
							src={props.picture !== null ? props.picture : DefaultAvatar}
						/>
					}
					title={props.name != null ? props.name : ""}
					description={description}
				/>
			</Skeleton>
		</Card>
	);
};

export default UsersCard;
