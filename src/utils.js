import * as qs from 'querystring';

function resourceUrl() {
  if (process.env.NODE_ENV === 'development') {
    return '/resources';
  } else {
    return '/esl-shadowing/resources';
  }
}

/* parseQuery */
function parseQuery(str) {
  const querystring = str || window.location.search.slice(1);
  return qs.parse(querystring);
}
/* stringifyQuery */
function stringifyQuery(obj) {
  return qs.stringify(obj);
}

function camelizeStr(str) {
  return str.replace(/[_.-](\w|$)/g, (_, x) => x.toUpperCase());
}

function snakifyStr(str) {
  return str.replace(/(?:^|\.?)([A-Z])/g, (_, x) => `_${x.toLowerCase()}`);
}

function convertCase(convertFunc) {
  function converter(thing) {
    if (thing instanceof Array) {
      return thing.map(i => converter(i));
    } else if (thing instanceof Object) {
      const newObj = {};
      Object.keys(thing).forEach(k => {
        newObj[convertFunc(k)] = converter(thing[k]);
      });
      return newObj;
    }
    return thing;
  }
  return converter;
}

export default {
  resourceUrl,
  parseQuery,
  stringifyQuery,
  camelizeStr,
  snakifyStr,
  camelizeKeys: convertCase(camelizeStr),
  snakifyKeys: convertCase(snakifyStr)
};
