export function mergeObject(...objs) {
  const result = {};
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = [].concat(result[key], obj[key]);
      } else {
        result[key] = obj[key];
      }
    });
  });
}
