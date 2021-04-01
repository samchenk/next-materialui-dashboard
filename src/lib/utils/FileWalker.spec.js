import suite from "baretest.js";
import code from "@hapi/code.js";
import path, { dirname } from "path.js";
import { fileURLToPath } from "url.js";
import FileWalker from "./FileWalker.js";
import { EventEmitter } from "events.js";

const { expect } = code;
const FileWalkerTestSuite = suite("FileWalker");

// REBUILD THE COMMON JS ENV VARIABLES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Check the API
 */
FileWalkerTestSuite("FileWalker can walk is own existing dir", () => {
	const WalkWithMe = new FileWalker();

	expect(WalkWithMe, "EventEmitter").to.be.an.instanceof(EventEmitter);
	expect(WalkWithMe.explore, ".explore()").to.be.an.instanceof(Function);
	expect(WalkWithMe.filterFiles, ".filterFiles()").to.be.an.instanceof(Function);
	expect(WalkWithMe.filterDirs, ".filterDirs()").to.be.an.instanceof(Function);
});

/**
 * Check the bad parameters
 */
// testSuite("FileWalker.explore() will throw on not existing dir", async () => {
// 	try {
// 		const walker = new FileWalker();

// 		const badDirectory = async () => {
// 			try {
// 				await walker.explore("toto");
// 			} catch (err) {
// 				throw err;
// 			}
// 		};

// 		await expect(badDirectory).to.throw();
// 	} catch (err) {}
// });

export default FileWalkerTestSuite;
