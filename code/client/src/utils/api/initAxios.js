import { baseUrl } from '../../shared/baseUrl';

export default function initialize(axios) {
  axios.defaults.baseURL = baseUrl;
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  axios.defaults.validateStatus = function (status) { return true; }; // don't care about status codes
}
