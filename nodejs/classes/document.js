const jsdom = require("jsdom");
const {
	JSDOM,
} = jsdom;
const utils = require("./utils");

const _colors = require("colors");
const v = require("./verbose");
const selectorsInterestTreshold = 5;

module.exports = {
	format: _colors.red(" {bar}") + " {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed} kbit",
	barCompleteChar: "\u2588",
	barIncompleteChar: "\u2591",
};
/**
 * @description Creates a parser with several parsing functions based on a single HTML parsed doc
 * @date 2018-12-03
 * @class parser
 */
class document {
	/**
	 *Creates an instance of document.
	 * @date 2019-03-17
	 * @param {String} dom String to parse
	 * @param {String} url URL of the document
	 */
	constructor(dom = dom, url = url) {
		this.document = (new JSDOM(dom)).window.document;
		this.body = document.body;
		this.url = url;
		utils.saveContent("tmp/" + this.url + ".html", this.getBody());
	}
	/**
	 * @description Returns the current doc URL
	 * @date 2018-12-03
	 * @return {String} The current doc's URL
	 */
	getURL() {
		return this.document.location;
	}
	/**
	 * @description Returns the current doc body HTML
	 * @date 2018-12-03
	 * @return {String} The current doc's body HTML
	 */
	getBody() {
		return this.document.innerHTML;
	}
	/**
	 * @description Returns the current doc title
	 * @date 2018-12-03
	 * @return {String} The current doc's title
	 */
	getTitle() {
		return this.document.title;
	}
	/**
	 * @description Returns an object containing the selectors' occurences in the current doc
	 * @date 2018-12-03
	 * @return {object} An object containing the most used selectors in the current doc
	 */
	async getSelectorsOccurences() {
		const action = "Parsing " + this.url + " used selectors\t";
		const document = this.document;
		const t = utils.tGo();
		const selectorsLength = document.querySelectorAll("*").length;
		const alreadyDone = {};
		const progressBar = v.newProgress(action, selectorsLength);

		progressBar.start(document.querySelectorAll("*").length, 0);

		// All elements
		const usedSelectors = await new Promise(function(resolve) {
			const usedSelectors = [];
			Array.from(document.querySelectorAll("*")).map((x) => x.classList).map((allClassesFromEle, index) => {
				// One more class browsed
				progressBar.update(index);

				for (const aClass of allClassesFromEle) {
					if (!alreadyDone[aClass]) {
						const occurences = document.querySelectorAll("[class='" + aClass + "']").length;
						if (occurences > selectorsInterestTreshold) {
							usedSelectors.push({
								"class": aClass,
								"occurences": occurences,
							});
						}
						alreadyDone[aClass] = true;
					}
				}
			});
			resolve(usedSelectors);
		});
		progressBar.stop();
		utils.saveContent("tmp/" + this.url + "mostUsedSelectorsWithOccurencies.js", JSON.stringify(usedSelectors));
		utils.tStop(t, action);

		return await this.eraseDupesByKey("class", usedSelectors);
	}
	/**
	 * @description Returns an object containing the most used selectors in the current doc
	 * @date 2018-12-03
	 * @return {object} An object containing the most used selectors in the current doc
	 */
	async getMostUsedSelectors() {
		const usedSelectors = await this.getSelectorsOccurences();
		const t = utils.tGo();
		const action = "Parsing " + this.url + " most used selectors";
		const mostUsedSelectors = await this.sortByOccurences(usedSelectors, "asc");
		utils.tStop(t, action);

		return mostUsedSelectors;
	}
	/**
	 * @description Returns an object containing the total length of a selector innerTexts
	 * @date 2018-12-03
	 * @param {String} selector
	 * @return {object} An object containing the selector with the total length of its innerTexts
	 * @memberof parser
	 */
	async getTextLengthOfASelector(selector) {
		return {
			"selector": selector,
			"textLength": Array.from(this.document.querySelectorAll(selector)).map(
				(_) => _.textContent.length)
				.reduce((pv, cv) => pv + cv),
		};
	}
	/**
	 * @description Returns an object containing the most used elements in the current doc
	 * @date 2018-12-03
	 * @return {object} An object containing the most used elements in the current doc
	 */
	getMostUsedElements() {
		const action = "Parsing " + this.url + " most used elements";
		const t = utils.tGo();
		const classObj = [];
		const document = this.document;
		// All elements
		Array.from(document.querySelectorAll("*")).map((x) => x.localName).map((anElement) => {
			classObj.push({
				"localName": anElement,
				"occurences": document.querySelectorAll(anElement).length,
			});
		});
		classObj.sort((a, b) => b["occurences"] - a["occurences"]);
		utils.tStop(t, action);
		return this.eraseDupesByKey("localName", classObj);
	}
	/**
	 * @description Returns the text content of a selector
	 * @date 2018-12-03
	 * @param {String} selector - The key to erase dupes by
	 * @return {object} An object containing the most used elements in the current doc
	 */
	getElementsText(selector = selector) {
		return Array.from(this.document.querySelectorAll("."+selector)).map((_) => { return utils.cleanString(_.textContent); } );
	}
	/**
	 * @description Erase dupes key from obj.
	 * @date 2018-12-03
	 * @param {String} key - The key to erase dupes by
	 * @param {String} obj - The object to erase dupes from
	 * @return {String} The object free from dupes.
	 */
	async eraseDupesByKey(key, obj) {
		return obj.filter((objToClean, index) => {
			return obj.map((objToClean) => objToClean[key]).indexOf(objToClean[key]) === index;
		});
	}
	/**
	 * @description Sort objects by most/least used occurences
	 * @date 2019-03-17
	 * @param {Object} obj Object to sort
	 * @param {String} order ASC or DSC
	 */
	async sortByOccurences(obj, order) {
		if (order == "asc") return obj.sort((a, b) => b["occurences"] - a["occurences"]);
		else return obj.sort((b, a) => b["occurences"] - a["occurences"]);
	}
}
module.exports = document;
