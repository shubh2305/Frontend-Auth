
const productionURL = 'https://backend-auth-zora.herokuapp.com/';
const developmentURL = 'http://localhost:8000/';

let config = '';

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = developmentURL;
} else {
  config = productionURL;
}

export default config;
