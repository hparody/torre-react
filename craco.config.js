const CracoLessPlugin = require("craco-less");

const modifyVars = {
	"primary-color": "#1DA57A",
};

module.exports = {
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: {
						modifyVars: modifyVars,
						javascriptEnabled: true,
					},
				},
			},
		},
	],
};
