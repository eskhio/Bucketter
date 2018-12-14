const v = require('./verbose');
const moment = require('moment');
const fs = require('fs');

/**
 * @description Creates an util toolbet with several useful functions
 * @date 2018-12-03
 * @class parser
 */
class utils {
 
    /**
     * @description Start a timer.
     * @date 2018-12-03
     * @returns {Date} A timer.
     */
    static tGo() {
        return new moment()
    }
    /**
     * @description Stops a timer.
     * @date 2018-12-03
     */
    static tStop(start, actionFinished="") {
        let end = new moment();
        let duration = moment(end - start);
        v.printStep(actionFinished);
        v.printOK(actionFinished + "\t -> \t " + duration + "ms [Start: " + moment(start).format("HH:mm:ss:SSS")+"]");
    }
    /**
     * @description Chain async steps one after the other
     * @date 2018-12-03
     * @param [steps] Array of steps to asynchroniselydsfsfsgh do
     * @returns Promise of every steps done
     */
    static async doAsync(steps) {
        for (step of Array.from(steps))
            await step();
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
            let textLengthOThisSelector = parsedDoc.getTextLengthOfASelector("." + musc).textLength
            v.print("-> " + (index + 1) + " - " + musc + ": " + muso + " occurences for " + textLengthOThisSelector + " chars");
        });
    }
    static wait(timeout) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeout)
        })
    }
    static cleanSourceName(sourceName) {
        return sourceName.match(/https?:\/{2}(w{3}\.)?(\w+)/)[2];
    }
    static saveContent(path, content) {
        fs.writeFile(path, content, {
            flag: 'w+'
        }, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    }
    static getLogTime(){
        return moment(new Date()).format("MMDDYYYYHHmmss");
    }

}

module.exports = utils;