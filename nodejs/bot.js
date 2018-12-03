const v = require('./classes/verbose');
const debug = process.argv[2];
const version   = 0.1;
const https = require("./classes/https");
const parser = require("./classes/parser");
const fs = require('fs');

let sources = [ "https://www.lemonde.fr", "http://www.lefigaro.fr"];

    async function main(){
        
        v.printOK(`BOT v${version} - DEBUG=${debug}`);
        v.printOK(`Sources :\t\n - ${sources.join("\n - ")}`);
        v.printSeparator();
        for(source of sources){
            let parsedDoc;
            v.printTitle(source);
            await https.get(source).then(
                function success(doc){
                    // Doc fetching
                    let start = new Date();
                    parsedDoc = new parser(doc);
                    let end = new Date() - start;
                    v.printStep("Doc fetching");
                    v.printOK("Doc fetching\t\t"+end+"ms");
                    // Top selectors parsing
                    v.printStep("Selectors parsing");
                    start = new Date();
                    let mostUsedSelectors = parsedDoc.getMostUsedSelectors().slice(0, 5);
                    end = new Date() - start;
                    v.printOK("Selectors parsing\t"+end+"ms");
                    v.printSeparator();

                    // Top selectors text content parsing
                    mostUsedSelectors.map((obj,index)=> {
                        start = new Date();

                        mus = obj;
                        muso = mus.occurences;
                        musc = mus.class;
                        
                        let textLengthOThisSelector = parsedDoc.getTextLengthOfASelector("."+musc).textLength
                        v.print("-> "+ (index+1)+" - "+musc+": "+muso+" occurences for "+textLengthOThisSelector+" chars");
                        end = new Date() - start;
                        //v.printOK("Parsed in "+end+"ms\n");
                    });
                    end = new Date() - start;
                    v.printOK("Top selectors text content parsed in: "+end+"ms");
                    v.printSeparator();
                },
                function fail(e) { v.printNOK(`-> ${e}`); }
            );
        }
    };

    main();