const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const u = require('./utils');
const fs = require('fs');

/**
 * @description Creates a parser with several parsing functions based on a single HTML parsed doc
 * @date 2018-12-03
 * @class parser
 */
class parser {
	constructor(dom) {
		this.document = (new JSDOM(dom)).window.document;
		fs.writeFile("tmp/"+this.getTitle()+".html", this.getBody(),{ flag: 'w+' }, function(err) {
			if(err) {
				return console.log(err);
			}
		}); 
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
		return this.document.body.innerHTML;
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
	 * @description Returns an object containing the most used selectors in the current doc
	 * @date 2018-12-03
	 * @returns {object} An object containing the most used selectors in the current doc
	 */
	getMostUsedSelectors() {
		let mostUsedSelectorsWithOccurencies = [];
		// All elements
		Array.from(this.document.querySelectorAll("*")).map(x => x.classList).map((allClassesFromEle) => {
			for (let aClass of allClassesFromEle) {
				mostUsedSelectorsWithOccurencies.push({ "class": aClass, "occurences": this.document.querySelectorAll("[class='" + aClass + "']").length });
			}
		});
		mostUsedSelectorsWithOccurencies.sort((a, b) => b["occurences"] - a["occurences"])
		fs.writeFile("tmp/"+this.getTitle()+"mostUsedSelectorsWithOccurencies.js", JSON.stringify(u.eraseDupesByKey("class", mostUsedSelectorsWithOccurencies)),{ flag: 'w+' }, function(err) {
			if(err) {
				return console.log(err);
			}
		}); 
		return u.eraseDupesByKey("class", mostUsedSelectorsWithOccurencies)
	}
	/**
	 * @description Returns an object containing the total length of a selector innerTexts
	 * @date 2018-12-03
	 * @param {string} selector
	 * @returns {object} An object containing the selector with the total length of its innerTexts
	 * @memberof parser
	 */
	getTextLengthOfASelector(selector) {
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
		let classObj = [];
		// All elements
		Array.from(this.document.querySelectorAll("*")).map(x => x.localName).map((anElement) => {
			classObj.push({ "localName": anElement, "occurences": this.document.querySelectorAll(anElement).length });
		});
		classObj.sort((a, b) => b["occurences"] - a["occurences"])
		return classObj.filter((obj, index) => {
			return classObj.map(obj => obj['localName']).indexOf(obj['localName']) === index;
		});
	}
	
}
module.exports = parser;