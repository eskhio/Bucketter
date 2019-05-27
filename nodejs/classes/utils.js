const v = require("./verbose");
const Moment = require("moment");
const fs = require("fs");

/**
 * @description Creates an util toolbet with several useful functions
 * @date 2018-12-03
 * @class parser
 */
class utils {
	/**
	 * @description Start a timer.
	 * @date 2018-12-03
	 * @return {Date} A timer.
	 */
	static tGo() {
		return new Moment();
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @static
	 * @param {timestamp} start Time started
	 * @param {string} actionFinished Action to display as ended
	 */
	static tStop(start, actionFinished = "") {
		const end = new Moment();
		const duration = new Moment(end - start);
		v.printStep(actionFinished);
		v.printOK(
			actionFinished + "\t -> \t " +
			duration + "ms [Start: " + new Moment(start).format("HH:mm:ss:SSS") + "]"
		);
	}
	/**
	 * @description Chain async steps one after the other
	 * @date 2018-12-03
	 * @param {Array} steps Array of steps to asynchroniselydsfsfsgh do
	 * @return {Boolean}
	 */
	static async doAsync(steps) {
		for (step of Array.from(steps)) {
			await step();
		}
		return true;
	}
	/**
	 * @description Get the text length of some nodes
	 * @date 2018-12-03
	 * @param {Array} nodesToMeasure
	 */
	async parseSelectorsTextLength(nodesToMeasure) {
		return nodesToMeasure.map((obj, index) => {
			mus = obj;
			muso = mus.occurences;
			musc = mus.class;
			const textLengthOThisSelector = parsedDoc.getTextLengthOfASelector("." + musc).textLength;
			v.print("-> " + (index + 1) + " - " +
				musc + ": " +
				muso + " occurences for " + textLengthOThisSelector + " chars"
			);
		});
	}
	/**
	 * @description Sleep a bit
	 * @date 2019-03-17
	 * @param {int} timeout Time to sleep
	 * @return {Object} A promise to wait for
	 */
	static wait(timeout) {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, timeout);
		});
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @param {String} sourceName The source name
	 * @return {String} A cleaned source name
	 */
	static cleanSourceName(sourceName) {
		return sourceName.match(/https?:\/{2}(w{3}\.)?(\w+)/)[2];
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @param {String} path Path to save to
	 * @param {String} content Content to write
	 */
	static saveContent(path, content) {
		fs.writeFile(path, content, {
			flag: "w+",
		}, function(err) {
			if (err) {
				return console.log(err);
			}
		});
	}
	/**
	 * @description Returns a time marker
	 * @date 2019-03-17
	 * @return {Object} A time
	 */
	static getLogTime() {
		return new Moment(new Date()).format("MMDDYYYYHHmmss");
	}
	/**
	 * @description Clean a string
	 * @date 2019-04-26
	 * @static
	 * @param {String} string String to clean
	 * @return {String} Cleaned string
	 */
	static cleanString(string = string ) {
		return string.replace(/\n/g, "").replace(/\s+/, " ").trim();
	}
	/**
	 * @description Erase dupes key from obj.
	 * @date 2018-12-03
	 * @param {String} key - The key to erase dupes by
	 * @param {String} obj - The object to erase dupes from
	 * @return {String} The object free from dupes.
	 */
	static async eraseDupesByKey(key, obj) {
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
	static async sortByOccurences(obj, order) {
		if (order == "asc") return obj.sort((a, b) => b["occurences"] - a["occurences"]);
		else return obj.sort((b, a) => b["occurences"] - a["occurences"]);
	}
}

module.exports = utils;
