const v = require('./verbose');
const debug = process.argv[2];
const version   = 0.1;
const https = require("./https");
const parser = require('./parser');

let sources = [ "https://www.lemonde.fr", "http://www.lefigaro.fr", "http://www.lepoint.fr", "https://www.google.fr"];

    async function main(){
        v.printSection(`BOT v${version} - DEBUG=${debug}`);
        v.printSection(`Sources (${sources.length}):\t\n - ${sources.join("\n - ")}`);
        for(source of sources){
            v.printStep(source);
            await https.get(source).then(
                function success(doc){
                    v.print(new parser(doc).getMostUsedElements());
                },
                function fail(e) { v.printNOK(`-> ${e}`); }
            );
        }
    }

    main();
