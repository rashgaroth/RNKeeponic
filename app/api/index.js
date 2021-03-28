// General api to access data
import ApiConstants from './ApiConstants';
export const api = (path, params, method, token) => {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(token && { token: token }),
    },
    method: method,
    ...(params && { body: JSON.stringify(params) }),
  };

  return fetch(ApiConstants.BASE_URL + path, options)
    .then(resp => resp.json())
    .then(json => json)
    .catch(error => error);
}

export const fetchURL = (url, options = {}) => {
  return fetch(url, options)
    .then(response => {
      if (!response.status === 200) {
        throw response.json();
      }
      return response.json();
    })
    .then(json => {
      return json;
    })
    .catch(error => { throw error });
}

