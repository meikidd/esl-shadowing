import axios from 'axios';
import Utils from './utils';

function api(method = 'get', src, data = {}) {
  const url = Utils.resourceUrl() + src;

  const params = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  };
  if (method === 'get' || method === 'delete') {
    params.params = Utils.snakifyKeys(data);
  } else {
    params.data = Utils.snakifyKeys(data);
  }

  return axios(params)
    .then(resp => Utils.camelizeKeys(resp.data))
    .catch(e => {
      throw e;
    });
}

export default {
  getResources() {
    return api('get', '/index.json');
  },
  getSubtitle(id) {
    return api('get', `/${id}/subtitle.json`);
  },
  getMergedSubtitle(id) {
    return api('get', `/${id}/merged.json`);
  }
};
