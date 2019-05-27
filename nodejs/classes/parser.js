const Verbose = require("./verbose");


/**
 * @description Parse methods for HTML documents
 * @date 2019-04-26
 * @class parser
 */
class parser {
	/**
	 * @description
	 * @date 2019-03-21
	 * @static
	 * @param {Object} docs Documents to find the most used elements from
	 */
	static parseSourcesUsedSelectors(docs = docs ) {
		Verbose.printTitle("Source's used selectors parsing");
		for (const parsedDoc of docs) {
			parsedDoc.selectorsOccurences = parsedDoc.getSelectorsOccurences();
		}
	}
	/**
	 * @description Find the most used selectors within some HTML documents
	 * @date 2019-03-21
	 * @param {Object} docs Documents to find the most used elements from
	 */
	static async parseSourcesMostUsedSelectors(docs = docs ) {
		Verbose.printTitle("Source's most used selectors parsing");
		for (const parsedDoc of docs) {
			parsedDoc.mostUsedSelectors = await parsedDoc.getMostUsedSelectors();
		}
	}
	/**
	 * @description Find the most used selectors within some HTML documents
	 * @date 2019-03-21
	 * @param {Object} docs Documents to find the title text from
	 */
	static async findTitleWithinDocuments(docs = docs ) {
		Verbose.printTitle("Source's title parsing");
		const mayTitleString = /title|titre/;

		for (const parsedDoc of docs) {
			parsedDoc.documentTitles = [];
			for (const mayTitle of await parsedDoc.document.getMostUsedSelectors()) {
				if (new RegExp(mayTitleString, "i").test(mayTitle.class)) {
					parsedDoc.documentTitles = parsedDoc.documentTitles.concat(
						parsedDoc.document.getElementsText(mayTitle.class)
					);
					continue;
				}
			}
		}
	}
	/**
	 * @description Find the most used HTML elements within some documents
	 * @date 2019-03-21
	 * @param {Object} docs Documents to find the most used elements from
	 */
	static parseDocumentsMostUsedElements(docs = docs ) {
		Verbose.printTitle("Source's most used elements parsing");
		for (const parsedDoc of docs) {
			parsedDoc.getMostUsedElements = parsedDoc.getMostUsedElements();
		}
	}
}

module.exports = parser;
