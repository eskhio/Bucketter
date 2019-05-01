// Requires
const fs = require("fs");

const https = require("./nodejs/classes/https");
const verbose = require("./nodejs/classes/verbose");

const parser = require("./nodejs/classes/parser");
// Consts
const sources = JSON.parse(fs.readFileSync("./sources.js", "utf8"));

// eslint-disable-next-line require-jsdoc
async function main() {
	try {
		verbose.printTitle("Source fetching");
		const updatedRawSources = await https.browseAndUpdateSourcesDocuments(sources);
		// await parser.parseSourcesMostUsedSelectors(updatedRawSources);
		// await parser.parseSourcesMostUsedElements(updatedRawSources);
		await parser.findTitleWithinDocuments(updatedRawSources);
		await parser.findMostUsedTopics(updatedRawSources);
	} catch (e) {
		verbose.printNOK(e);
	}
}

main();
