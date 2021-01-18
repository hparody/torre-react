import React from "react";
import { Pagination } from "antd";
import "./Pagination.less"

const PaginationSection = (props) => {
	return (
		<Pagination
			className="pagination"
			current={props.current}
			onChange={props.onChange}
			total={props.total}
			showSizeChanger={false}
			showQuickJumper
			showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
			defaultPageSize={props.defaultPageSize}
		/>
	);
};

export default PaginationSection;
