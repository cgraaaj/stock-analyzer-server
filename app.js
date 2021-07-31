const express = require("express");
const app = express();
const axios = require('axios').default;
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cors = require('cors')

const instance = axios.create({ withCredentials: true });
axiosCookieJarSupport(instance);
instance.defaults.jar = new tough.CookieJar();

app.use(cors())

const port = process.env.PORT || 8080

app.get("/option-chain", (req, res, next) => {
    instance.get('https://www.nseindia.com/')
        .then(resp => instance.get(`https://www.nseindia.com/api/option-chain-${req.query.index}?symbol=${req.query.symbol}`))
        .then(resp => {
            res.send(resp.data)
        })
        .catch(resp => console.error(resp))
});

app.get("/equities", (req, res, next) => {
    instance.get('https://www.nseindia.com/')
        .then(resp => instance.get('https://www.nseindia.com/api/master-quote'))
        .then(resp => {
            res.send(resp.data)
        })
        .catch(resp => console.error(resp))
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});