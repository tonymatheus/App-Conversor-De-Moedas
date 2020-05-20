import axios from 'axios';
//convert?q=USD_BRL&compact=ultra&apiKey=7ec9e361f8e2e82d7285
const api = axios.create({
    baseURL:'https://free.currencyconverterapi.com/api/v5/'
});

export default api;