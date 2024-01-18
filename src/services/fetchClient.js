import axios from 'axios';

const wait = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

axios.defaults.baseURL = 'https://reqres.in/api';

function request(url, method, data) {
  const options = { method };

  if (data) {
    options.data = data;

    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  return wait(300)
    .then(() => axios.request({ url, method, data }))
    .then((response) => {
      return response.data;
    });
}

export const client = {
  get: (url) => request(url),
  post: (url, data) => request(url, 'POST', data),
  delete: (url) => request(url, 'DELETE'),
  patch: (url, data) => request(url, 'PATCH', data),
};
