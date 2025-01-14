"use strict";

const request = require("request");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const utilities = require("../../utilities");

function saveFile(filename, contents, callback) {
  mkdirp(path.dirname(filename), (err) => {
    if (err) {
      return callback(err);
    }
    fs.writeFile(filename, contents, callback);
  });
}

function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  request(url, (err, response, body) => {
    if (err) {
      return callback(err);
    }
    saveFile(filename, body, (err) => {
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved:${url}`);
      callback(null, body);
    });
  });
}

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }
  const links = utilities.getPageLinks(currentUrl, body); // [1]

  function iterate(index) {
    // [2]
    if (index === links.length) {
      return callback();
    }
    spider(links[index], nesting - 1, (err) => {
      // [3]
      if (err) {
        return callback(err);
      }
      iterate(index + 1);
    });
  }

  iterate(0); // [4]
}

function spider(url, nesting, callback) {
  const filename = utilities.urlToFilename(url);
  fs.readFile(filename, "utf8", (err, body) => {
    if (err) {
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

spider(process.argv[2], 1, (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});

/*function iterator(index) {
  if (index === tasks.length) {
    return finish();
  }
  const task = task[index];
  task(function () {
    iterator(index + 1);
  });
}

function finish() {}

iterator(0);*/

// async 版本的spiderLinks
const async = require("async");

function spiderLinks(currentUrl, body, nesting, callback) {
  if (nesting === 0) {
    return process.nextTick(callback);
  }
  const links = utilities.getPageLinks(currentUrl, body);
  if (links.length === 0) {
    return process.nextTick(callback);
  }
  async.eachSeries(
    links,
    (link, callback) => {
      spider(link, nesting - 1, callback);
    },
    callback
  );
}


