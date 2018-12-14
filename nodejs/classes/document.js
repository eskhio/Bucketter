const jsdom = require("jsdom");
const {
	JSDOM
} = jsdom;
const utils = require('./utils');
const verbose = require('./verbose');
var _progress = require('cli-progress');
const _colors = require('colors');
const moment = require('moment');
const selectorsInterestTreshold = 5;

module.exports = {
	format: _colors.red(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total} | Speed: {speed} kbit',
	barCompleteChar: '\u2588',
	barIncompleteChar: '\u2591'
};
/**
 * @description Creates a parser with several parsing functions based on a single HTML parsed doc
 * @date 2018-12-03
 * @class parser
 */
class document {
	constructor(dom = dom, url = url) {
		this.document = (new JSDOM(dom)).window.document;
		this.body = document.body;
		this.url = url;
		utils.saveContent("tmp/" + this.url + ".html", this.getBody());
	}
	/**
	 * @description Returns the current doc URL
	 * @date 2018-12-03
	 * @returns {string} The current doc's URL
	 */
	getURL() {
		return this.document.location;
	}
	/**
	 * @description Returns the current doc body HTML
	 * @date 2018-12-03
	 * @returns {string} The current doc's body HTML
	 */
	getBody() {
		return this.document.innerHTML;
	}
	/**
	 * @description Returns the current doc title
	 * @date 2018-12-03
	 * @returns {string} The current doc's title
	 */
	getTitle() {
		return this.document.title;
	}
	/**
	 * @description Returns an object containing the selectors' occurences in the current doc
	 * @date 2018-12-03
	 * @returns {object} An object containing the most used selectors in the current doc
	 */
	async getSelectorsOccurences() {
		let action = "Parsing " + this.url + " used selectors\t";
		let document = this.document;
		let t = utils.tGo();
		let selectorsLength = document.querySelectorAll("*").length;
		let alreadyDone = {};
		let progressBar = new _progress.Bar({
			format: "["+moment(new Date()).format("HH:mm:ss:SSS")+"] "+action + _colors.green(' {bar}') + " {percentage}% | ETA: {eta}s | {value}/" + selectorsLength + " selectors parsed",
			hideCursor: true,
			stopOnComplete: true,
			clearOnComplete: true,
			etaBuffer: 200,
		}, _progress.Presets.rect);

		progressBar.start(document.querySelectorAll("*").length, 0);

		// All elements
		let usedSelectors = await new Promise(function (resolve, reject) {
				let usedSelectors = [];
				Array.from(document.querySelectorAll("*")).map(x => x.classList).map((allClassesFromEle, index) => {
				// One more class browsed
				progressBar.update(index);

				for (let aClass of allClassesFromEle) {
					if (!alreadyDone[aClass]) {
						let occurences = document.querySelectorAll("[class='" + aClass + "']").length;
						if (occurences > selectorsInterestTreshold)
							usedSelectors.push({
								"class": aClass,
								"occurences": occurences
							});
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
	 * @returns {object} An object containing the most used selectors in the current doc
	 */
	async getMostUsedSelectors() {
		let usedSelectors = await this.getSelectorsOccurences();
		let t = utils.tGo();
		let action = "Parsing " + this.url + " most used selectors";
		let mostUsedSelectors = await this.sortByOccurences(usedSelectors, "asc");
		utils.tStop(t, action);

		return mostUsedSelectors;

	}
	/**
	 * @description Returns an object containing the total length of a selector innerTexts
	 * @date 2018-12-03
	 * @param {string} selector
	 * @returns {object} An object containing the selector with the total length of its innerTexts
	 * @memberof parser
	 */
	async getTextLengthOfASelector(selector) {
		return {
			"selector": selector,
			"textLength": Array.from(this.document.querySelectorAll(selector)).map(_ => _.textContent.length).reduce((pv, cv) => pv + cv)
		};
	}
	/**
	 * @description Returns an object containing the most used elements in the current doc
	 * @date 2018-12-03
	 * @returns {object} An object containing the most used elements in the current doc
	 */
	getMostUsedElements() {
		let action = "Parsing " + this.url + " most used selectors";
		let t = utils.tGo();
		let classObj = [];
		let document = this.document;
		// All elements
		Array.from(document.querySelectorAll("*")).map(x => x.localName).map((anElement) => {
			classObj.push({
				"localName": anElement,
				"occurences": document.querySelectorAll(anElement).length
			});
		});
		classObj.sort((a, b) => b["occurences"] - a["occurences"])
		utils.tStop(t, action);
		return this.eraseDupesByKey("localName", classObj);
	}
	/**
	 * @description Erase dupes key from obj.
	 * @date 2018-12-03
	 * @param {string} key - The key to erase dupes by
	 * @param {string} obj - The object to erase dupes from
	 * @returns {string} The object free from dupes.
	 */
	async eraseDupesByKey(key, obj) {
		return obj.filter((objToClean, index) => {
			return obj.map(objToClean => objToClean[key]).indexOf(objToClean[key]) === index;
		});

	}
	async sortByOccurences(obj, order){
        if(order=="asc") return obj.sort((a, b) => b["occurences"] - a["occurences"])
        else return obj.sort((b, a) => b["occurences"] - a["occurences"])
    }
}
module.exports = document;