const axios = require('axios');
const apiEndpoints = require('../config/apiEndpoints');
const keys = require('../config/keys');

const geoCodingURL = apiEndpoints.geoCodingURL;
const Flatted = require('flatted'); //parses the circular JSON geocoding returns

function translate(city) {
    //console.log(city)
    axios.get(geoCodingURL, {
        params: {
            address: city,
            key: keys.googleAPI
        }
    }).then((response)=> {
        let json = Flatted.parse(Flatted.stringify(response));
        console.log(json.data.results[0].geometry.location);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = translate; 
