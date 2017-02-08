const axios = require('axios').create({
    baseURL: 'https://api.merchantos.com/',
    headers: { 'Authorization': 'Bearer ' + process.env.LIGHTSPEED_ACCESS_TOKEN }
});

module.exports = {
	getCurrentAccount: function() {
		return axios
			.get('API/Account.json')
			.then(response => response.data.Account);
	},

	getInventory: function(accountId) {
		return axios
			.get(`/API/Account/${accountId}/Item.json`)
			.then(response => response.data);
	},

	getReports: function(accountId) {
		return axios
		.get(`/API/Account/${accountId}/Reports/Accounting/DiscountsByDay.json?startDate=2017-01-01&endDate=2017-01-31`)
		.then(response => response.data);
	}
}
