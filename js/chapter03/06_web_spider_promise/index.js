"use strict";

const utilities = require("../../utilities");
const request = utilities.promisify(require("request"));
const mkdirp = utilities.promisify(require("mkdirp"));
const fs = utilities.promisify(require("fs"));
const readFile = utilities.promisify(fs.readFile);
const writeFile = utilities.promisify(fs.writeFile);

const path = require("path");
const TaskQueue = require("./taskQueue");
const downloadQueue = new TaskQueue(2);

function download(url, filename, callback) {
	console.log(`Downloading ${url}`);
	let body;
	return request(url)
		.then((response) => {
			body = response.body;
			return mkdirp(path.dirname(filename));
		})
		.then(() => writeFile(filename, body))
		.then(() => {
			console.log(`Downloaded and saved:${url}`);
			return body;
		});
}

function saveFile(filename, contents, callback) {
	mkdirp(path.dirname(filename), (err) => {
		if (err) {
			return callback(err);
		}
		fs.writeFile(filename, contents, callback);
	});
}

function spiderLinks(currentUrl, body, nesting) {
	let promise = Promise.resolve();

	if (nesting === 0) {
		return promise;
	}

	const links = utilities.getPageLinks(currentUrl, body);
	if (links.length === 0) {
		return Promise.resolve();
	}

	return new Promise((resolve, reject) => {
		let completed = 0;
		let errored = false;
		links.forEach((link) => {
			let task = () => {
				return spider(link, nesting - 1)
					.then(() => {
						if (++completed === links.length) {
							resolve();
						}
					})
					.catch(() => {
						if (!errored) {
							errored = true;
							reject();
						}
					});
			};
			downloadQueue.pushTask(task);
		});
	});
}

const spidering = new Map();

function spider(url, nesting, callback) {
	if (spidering.has(url)) {
		return process.nextTick(callback);
	}
	spidering.set(url, true);
	const filename = utilities.urlToFilename(url);

	fs.readFile(filename, "utf8", (err, body) => {
		if (err) {
			/.,
			if (err.code !== "ENOENT") {
				return callback(err);
			}
			return download(url, filename, (err, body) => {
				if (err) {
					return callback(err);
				}
				spiderLinks(url, body, nesting, callback);
			});
		}
		spiderLinks(url, body, nesting, callback);
	});
}

spider(process.argv[2], 1)
	.then(() => console.log("Download complete"))
	.catch((err) => console.log(err));

/*// 模式
let tasks = [
  /!*....*!/
];
let promise = Promise.resolve();
tasks.forEach((task) => {
  promise = promise.then(() => {
    return task();
  });
});
promise.then(() => {
  //
});*/

/*let tasks = [
  /!*  *!/
];
let promise = task.reduce((prev, task) => {
  return prev.then(() => {
    return task();
  });
}, Promise.resolve());

promise.then(() => {});*/


function asyncDivision(dividend, divisor, cb) {
	return new Promise((resolve, reject) => {
		process.nextTick(() => {
			const result = dividend / divisor
			if (isNaN(result) || !Number.isFinite(result)) {
				const errror = new Error('Invalid operands')
				if (cb) {
					cb(errror)
				}
				return reject(error)
			}
			if (cb) {
				cb(null, result)
			}
			resolve(result)
		})
	})
}


asyncDivision(10, 2, (error, result) => {
	if (error) {
		return console.error(error)
	}
	console.log(result)
})

asyncDivision(22, 11)
	.then(result => console.log(result))
	.catch(error => console.error(error))
