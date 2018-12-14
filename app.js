// Requires
const fs = require('fs');

const https = require("./nodejs/classes/https");
const verbose = require('./nodejs/classes/verbose');
const document = require('./nodejs/classes/document');

// Consts
const sources = JSON.parse(fs.readFileSync("./sources.js", "utf8"));

async function main() {
    try {
        
        verbose.printTitle("Source fetching");
        let updatedRawSources = await https.browseAndUpdateSourcesDocuments(sources);
        await parseSourcesMostUsedSelectors(updatedRawSources);
        /*parseSourcesMostUsedElements(updatedRawSources);*/

    } catch (e) {
        verbose.printNOK(e);
    }
}
function parseSourcesUsedSelectors(updatedRawSources = updatedRawSources) {
    verbose.printTitle("Source used selectors parsing");
    for (parsedSourcesDoc of updatedRawSources) {
        let parsedDoc = new document(parsedSourcesDoc.document, parsedSourcesDoc.url)
        parsedDoc.getSelectorsOccurences();
    }
}
async function parseSourcesMostUsedSelectors(updatedRawSources = updatedRawSources) {
    verbose.printTitle("Source most used selectors parsing");
    for (parsedSourcesDoc of updatedRawSources) {
        let parsedDoc = new document(parsedSourcesDoc.document, parsedSourcesDoc.url)
        await parsedDoc.getMostUsedSelectors();
    }
}

function parseSourcesMostUsedElements(updatedRawSources = updatedRawSources) {
    verbose.printTitle("Source most used elements parsing");
    for (parsedSourcesDoc of updatedRawSources) {
        let parsedDoc = new document(parsedSourcesDoc.document, parsedSourcesDoc.url)
        parsedDoc.getMostUsedElements();
    }
}

main();
