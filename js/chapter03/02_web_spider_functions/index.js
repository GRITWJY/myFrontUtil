"use strict";

const request = require("request");
const fs = require("fs");
const mkdirp = require("mkdirp");
const path = require("path");
const utilities = require("../../utilities");

const async = require("async");

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

function spider(url, callback) {
  const filename = utilities.urlToFilename(url);
  fs.exists(filename, (exists) => {
    if (exists) {
      return callback(err);
    }
    download(url, filename, (err) => {
      if (err) {
        return callback(err);
      }
      callback(null, filename, true);
    });
  });
}

spider(process.argv[2], (err, filename, downloaded) => {
  if (err) {
    console.log(err);
  } else if (downloaded) {
    console.log(`Completed the download of "${filename}"`);
  } else {
    console.log(`"${filename}" was already downloaded`);
  }
});

// async版本的download函数
function download(url, filename, callback) {
  console.log(`Downloading ${url}`);
  let body;
  async.series(
    [
      (callback) => {
        // [1]
        request(url, (err, response, resBody) => {
          if (err) {
            return callback(err);
          }
          body = resBody;
          callback();
        });
      },
      mkdirp.bind(null, path.dirname(filename)), // [2]
      (callback) => {
        //[3]
        fs.writeFile(filename, body, callback);
      },
    ],
    (err) => {
      //[4]
      if (err) {
        return callback(err);
      }
      console.log(`Downloaded and saved: ${url}`);
      callback(null, body);
    }
  );
}
