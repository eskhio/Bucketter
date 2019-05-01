const v = require("./verbose");
const moment = require("moment");
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
		return new moment();
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @static
	 * @param start
	 * @param [actionFinished=""]
	 */
	static tStop(start, actionFinished = "") {
		const end = new moment();
		const duration = moment(end - start);
		v.printStep(actionFinished);
		v.printOK(actionFinished + "\t -> \t " + duration + "ms [Start: " + moment(start).format("HH:mm:ss:SSS") + "]");
	}
	/**
	 * @description Chain async steps one after the other
	 * @date 2018-12-03
	 * @param [steps] Array of steps to asynchroniselydsfsfsgh do
	 * @return Promise of every steps done
	 */
	static async doAsync(steps) {
		for (step of Array.from(steps)) {
			await step();
		}
		return true;
	}
	/**
	 * @description
	 * @date 2018-12-03
	 * @param nodesToMeasure
	 * @returns
	 */
	async parseSelectorsTextLength(nodesToMeasure) {
		return nodesToMeasure.map((obj, index) => {
			mus = obj;
			muso = mus.occurences;
			musc = mus.class;
			const textLengthOThisSelector = parsedDoc.getTextLengthOfASelector("." + musc).textLength;
			v.print("-> " + (index + 1) + " - " + musc + ": " + muso + " occurences for " + textLengthOThisSelector + " chars");
		});
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @static
	 * @param timeout
	 * @returns
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
	 * @static
	 * @param sourceName
	 * @returns
	 */
	static cleanSourceName(sourceName) {
		return sourceName.match(/https?:\/{2}(w{3}\.)?(\w+)/)[2];
	}
	/**
	 * @description
	 * @date 2019-03-17
	 * @static
	 * @param path
	 * @param content
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
	 * @description
	 * @date 2019-03-17
	 * @static
	 * @returns
	 */
	static getLogTime() {
		return moment(new Date()).format("MMDDYYYYHHmmss");
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
