
const v = require("./verbose");
const u = require("./utils");
const request = require("request");
const Document = require("./document");

/**
 * @description Handles HTTP requests
 * @date 2019-03-21
 * @class https
 */
class https {
	/**
	 * @description Performs an async HTTP request towards an URL and fetch the response
	 * @date 2018-12-07
	 * @static
	 * @param {String} url The HTTP URL to fetch the response from
	 * @param {String} reqDesc The description of the request
	 * @param {String} expectedStatus The status expected from the request
	 * @param {String} errorFn The error to raise when fail
	 */
	static async get(url, reqDesc, expectedStatus, errorFn) {
		const response = await new Promise(function(resolve, reject) {
			v.printStep(reqDesc);
			const t = u.tGo();
			request(url, function(error, response) {
				const reqError = reqDesc + " -> " + error;
				if (error) {
					v.printNOK(reqError);
					if (errorFn) errorFn();
					throw Error(reqError);
				} else {
					u.tStop(t, reqDesc);
					resolve(response);
				}
			});
		}).catch((error) => v.printNOK(error));

		this.assertExpectedResponseStatus(url, expectedStatus, response, errorFn ? errorFn : null);

		return response.body;
	}
	/**
	 * @description Asserts an HTTP's response's status code against the expected status code from this request
	 * @date 2018-12-07
	 * @static
	 * @param {String} url The HTTP URL to fetch the response from
	 * @param {String} expectedStatus The response' status expected from the request
	 * @param {String} response The response's status obtained from the HTTP request towards url
	 * @param {String} errorFn The error to raise when fail
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
	 * @param {Array} sources Sources to browse
	 * @return {Object} { sourceContent.url, sourceContent.document, sourceContent.updated }
	 */
	static async browseAndUpdateSourcesDocuments(sources = sources) {
		const sourcesContent = [];

		for (const source of sources) {
			const sourceContent = {};
			sourceContent.url = u.cleanSourceName(source);
			sourceContent.document = new Document(
				await https.get(source, "Fetching " + source + "\t", ["200"]),
				u.cleanSourceName(source)
			);
			sourceContent.updated = u.getLogTime();
			sourcesContent.push(sourceContent);
		}
		u.saveContent("./sourcesContent.js", JSON.stringify(sourcesContent));

		return sourcesContent;
	}
}

module.exports = https;
