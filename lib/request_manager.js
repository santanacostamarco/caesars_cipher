const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const https = require("https");

module.exports = {
	get: (url) => {
		let xhr;

		https.get(url, (response) => {
			console.log(response);
		}).on('error', (e) => {
		  	xhr = e;
		});


		// let xhr = new XMLHttpRequest();
		// xhr.open("GET", url, true);
		// xhr.send();

		return xhr;
	},
	post: (url, data) => {

		// let xhr = new XMLHttpRequest();
		// xhr.open("POST", url);
		// xhr.send(data);

		// return xhr;
	}
}
