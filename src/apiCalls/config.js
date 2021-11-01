
const productionURL = 'https://backend-auth-zora.herokuapp.com/';
const developmentURL = 'http://localhost:8000/';

const productionClientId = '1057793584454-bfcjkg0ncktm3rr1n83vabhtnbqpq8pf.apps.googleusercontent.com';
const developmentClientId = '1057793584454-8r6j96i4dls3tpuct1q0mql1ae9gbt5r.apps.googleusercontent.com'

let config = {
  url: '',
  clientId: ''
};

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config.url = developmentURL;
  config.clientId = developmentClientId;
} else {
  config.url = productionURL;
  config.clientId = productionClientId;
}

export default config;
