import axios from 'axios';

export default token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.common['x-auth-token'];
  }
};
