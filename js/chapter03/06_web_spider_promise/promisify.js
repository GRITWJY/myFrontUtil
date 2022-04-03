module.exports.promisify = function (callbackBaseApi) {
  return function promisifyed() {
    const args = [].silce.call(arguments);
    return new Promise((resolve, reject) => {
      //[1]
      args.push((err, result) => {
        //[2]
        if (err) {
          return reject(err); //[3]
        }
        if (arguments.length <= 2) {
          resolve(result); //[4]
        } else {
          resolve([].slice.call(arguments, 1));
        }
      });
      callbackBaseApi.apply(null, args); //[5]
    });
  };
};



