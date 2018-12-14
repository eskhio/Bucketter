const v = require('./verbose');
const u = require('./utils');
const request = require('request');
const maxRetries = 10;


class https {
	/**
	 * @description Performs an async HTTP request towards an URL and fetch the response
	 * @date 2018-12-07
	 * @static
	 * @param {String} url The HTTP URL to fetch the response from
	 * @param {String} reqDesc The description of the request
	 * @param {String} expectedStatus The status expected from the request
	 */
	static async get(url, reqDesc, expectedStatus, errorFn) {
		let response = await new Promise(function (resolve, reject) {
			v.printStep(reqDesc);
			let t = u.tGo();
			request(url, function (error, response) {
				let reqError = reqDesc + " -> " + error;
				if (error) {
					v.printNOK(reqError);
					if (errorFn) errorFn();
					throw Error(reqError);
				} else {
					u.tStop(t, reqDesc);
					resolve(response);
				}
			});
		}).catch(error => v.printNOK(error));

		this.assertExpectedResponseStatus(url, expectedStatus, response, errorFn ? errorFn : null);

		return response.body;
	}
	/**
	 * @description Asserts an HTTP's response's status code against the expected status code from this request
	 * @date 2018-12-07
	 * @static
	 * @param {String} url The HTTP URL to fetch the response from
	 * @param {String} expectedStatus The response' status expected from the request
	 * @param {String} responseStatus The response's status obtained from the HTTP request towards url
	 */
	static assertExpectedResponseStatus(url = url, expectedStatus = expectedStatus, response = response, errorFn = errorFn) {
		expectedStatus = expectedStatus.join("|");
		if (!new RegExp(expectedStatus).test(response.statusCode)) {
			if (errorFn) errorFn();
			v.printNOK("Status code un-expected for " + url + ": " + response.statusCode + " VS " + expectedStatus);
		}
	}

	/**
	 * @description
	 * @date 2018-12-10
	 * @static 
	 * @param [sources=sources]
	 * @returns {Object} { sourceContent.url, sourceContent.document, sourceContent.updated } 
	 */
	static async browseAndUpdateSourcesDocuments(sources = sources) {
		
		let sourcesContent = [];

		for (let source of sources) {
			
			let sourceContent = {};
			sourceContent.url = u.cleanSourceName(source);
			sourceContent.document = await https.get(source, "Fetching " + source + "\t", ["200"]);
			sourceContent.updated = u.getLogTime();
			sourcesContent.push(sourceContent);
		}

		u.saveContent("./sourcesContent.js", JSON.stringify(sourcesContent));

		return sourcesContent;
	}
}

module.exports = https;