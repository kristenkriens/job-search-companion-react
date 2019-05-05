import axios from 'axios';

const firebaseAxios = axios.create({
  baseURL: 'https://job-search-compa-1514144240150.firebaseio.com/'
});

export default firebaseAxios;
