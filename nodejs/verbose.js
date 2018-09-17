const colors={
    "Reset":"\x1b[0m",
    "Bright":"\x1b[1m",
    "Dim":"\x1b[2m",
    "Underscore":"\x1b[4m",
    "Blink":"\x1b[5m",
    "Reverse":"\x1b[7m",
    "Hidden":"\x1b[8m",
    "FgBlack":"\x1b[30m",
    "FgRed":"\x1b[31m",
    "FgGreen":"\x1b[32m",
    "FgYellow":"\x1b[33m",
    "FgBlue":"\x1b[34m",
    "FgMagenta":"\x1b[35m",
    "FgCyan":"\x1b[36m",
    "FgWhite":"\x1b[37m",
    "BgBlack":"\x1b[40m",
    "BgRed":"\x1b[41m",
    "BgGreen":"\x1b[42m",
    "BgYellow":"\x1b[43m",
    "BgBlue":"\x1b[44m",
    "BgMagenta":"\x1b[45",
    "BgCyan":"\x1b[46m",
    "BgWhite":"\x1b[47m"
}

class verbose {
   
    constructor(name){
        this.name   = name;
    }

    static print(text){
        
        console.log(text);
    }
    static printSection(text){
        console.log("-------------");
        this.print(text);
        console.log("-------------");
    }
    static printStep(text){
        process.stdout.write(`-> ${text}\t... `);
    }
    static printOK(text){
        console.log(colors.FgGreen+text+"\x1b[0m");
    }
    static printNOK(text){
        console.log(colors.FgRed+text+"\x1b[0m");
    }    
}
module.exports = verbose;