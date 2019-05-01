const moment = require("moment");
const chalk = require("chalk");
const log = console.log;
const _progress = require("cli-progress");
/**
 * @description Verbose methods
 * @date 2019-04-26
 * @class verbose
 */
class verbose {
	/**
	 *Creates an instance of verbose.
	 * @date 2019-04-26
	 * @param {String} name Name of this verbose
	 */
	constructor(name) {
		this.name = name;
	}
	/**
	 * @description
	 * @date 2019-04-26
	 * @param {String} text
	 */
	static print(text) {
		log("[" + moment(new Date()).format("HH:mm:ss:SSS") + "] " + text);
	}

	/**
	 * @description Print a title
	 * @date 2019-04-26
	 * @static
	 * @param {String} text
	 */
	static printTitle(text) {
		log("\n[ - " + text + " - ]\n");
	}
	/**
	 * @description Print a separator
	 * @date 2019-04-26
	 */
	static printSeparator() {
		log("[" + moment(new Date()).format("HH:mm:ss:SSS") + "] \n-----------------------------\n");
	}
	/**
	 * @description Print a step
	 * @date 2019-04-26
	 * @param {String} text
	 */
	static printStep(text) {
		process.stdout.write(text + "\t");
		process.stdout.write("...\r");
	}
	/**
	 * @description Print an OK message
	 * @date 2019-04-26
	 * @param {String} text
	 */
	static printOK(text) {
		log(chalk.green("[" + moment(new Date()).format("HH:mm:ss:SSS") + "] " + text));
	}
	/**
	 * @description Print a NOK message
	 * @date 2019-04-26
	 * @param {String} text
	 */
	static printNOK(text) {
		log(chalk.red("[" + moment(new Date()).format("HH:mm:ss:SSS") + "] " + text));
	}
	/**
	 * @description New progress bar
	 * @date 2019-04-26
	 * @param {String} action Current action
	 * @param {Int} valueLen Total value to reach
	 * @param {String} text Text to show
	 * @return {Object} A progress bar
	 */
	static newProgress(action, valueLen, text) {
		return new _progress.Bar({
			format: "[" + moment(new Date()).format("HH:mm:ss:SSS") + "] " +
			action + chalk.green(" {bar}") + " {percentage}% | ETA: {eta}s | {value}/" + valueLen,
			hideCursor: true,
			stopOnComplete: true,
			clearOnComplete: true,
			etaBuffer: 200,
		}, _progress.Presets.rect);
	}
}
module.exports = verbose;
