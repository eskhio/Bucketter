const moment = require('moment');

const colors = {
    "Reset": "\x1b[0m",
    "Bright": "\x1b[1m",
    "Dim": "\x1b[2m",
    "Underscore": "\x1b[4m",
    "Blink": "\x1b[5m",
    "Reverse": "\x1b[7m",
    "Hidden": "\x1b[8m",
    "FgBlack": "\x1b[30m",
    "FgRed": "\x1b[31m",
    "FgGreen": "\x1b[32m",
    "FgYellow": "\x1b[33m",
    "FgBlue": "\x1b[34m",
    "FgMagenta": "\x1b[35m",
    "FgCyan": "\x1b[36m",
    "FgWhite": "\x1b[37m",
    "BgBlack": "\x1b[40m",
    "BgRed": "\x1b[41m",
    "BgGreen": "\x1b[42m",
    "BgYellow": "\x1b[43m",
    "BgBlue": "\x1b[44m",
    "BgMagenta": "\x1b[45",
    "BgCyan": "\x1b[46m",
    "BgWhite": "\x1b[47m"
}

class verbose {

    constructor(name) {
        this.name = name;
    }
    static print(text) {
        console.log("["+moment(new Date()).format("HH:mm:ss:SSS")+"] "+text);
    }

    static printTitle(text) {
        console.log("\n[ - " + text + " - ]\n");
    }
    static printSeparator() {
        console.log("["+moment(new Date()).format("HH:mm:ss:SSS")+"] \n-----------------------------\n");
    }
    static printStep(text) {
        process.stdout.write(text + "\t");
        process.stdout.write("...\r");
    }
    static printOK(text) {
        console.log("["+moment(new Date()).format("HH:mm:ss:SSS")+"] "+colors.FgGreen + text + "\x1b[0m"+colors.Reset);
    }
    static printNOK(text) {
        console.log("["+moment(new Date()).format("HH:mm:ss:SSS")+"] "+colors.FgRed + text + "\x1b[0m"+colors.Reset);
    }
    static printInline(text, color) {
        process.stdout.write(colors.FgCyan + text + "\x1b[0m");
    }
}
module.exports = verbose;