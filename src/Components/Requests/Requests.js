import React from "react";
import axios from "axios";

const SearchMultiple = (props) => {
	return new Promise((resolve, reject) => {
		let url, requestBody;
		switch (props.searchType) {
			case "users":
				url =
					"https://search.torre.co/people/_search/?offset=" +
					props.offset +
					"&size=60&aggregate=false";
				requestBody = {
					or: [
						{
							name: {
								term: props.search,
							},
						},
						{
							organization: {
								term: props.search,
							},
						},
					],
				};
				break;

			case "jobs":
				url =
					"https://search.torre.co/opportunities/_search/?offset=" +
					props.offset +
					"&size=100&aggregate=false";
				requestBody = {
					"skill/role": {
						text: props.search,
						experience: "potential-to-develop",
					},
				};
				break;
			default:
				reject({ status: "Error", message: "Missing Param Search Type" });
		}

		axios({
			method: "post",
			url: url,
			headers: {
				"Content-Type": "application/json",
			},
			data: requestBody,
		})
			.then((res) => {
                resolve(res.data);
            })
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
};

const SearchSingle = (props) => {

}; 

const Requests = {
	searchMultiple: SearchMultiple,
	searchSingle: SearchSingle,
};

export default Requests;
