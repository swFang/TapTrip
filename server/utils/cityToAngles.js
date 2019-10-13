const axios = require('axios');
const apiEndpoints = require('../config/apiEndpoints');
const keys = require('../config/keys');

const geoCodingURL = apiEndpoints.geoCodeURL;
const Flatted = require('flatted'); //parses the circular JSON geocoding returns

async function translate(city) {
    //console.log(city)
    console.log('inside translate');
    var res
    const temp = await
        axios.get(geoCodingURL, {
            params: {
                address: city,
                key: keys.googleAPI
            }
        }).then((response)=> {
            let json = Flatted.parse(Flatted.stringify(response));
            res = json.data.results[0].geometry.location;

        }).catch((error) => {
            console.log(error);
            return false;
        });
    return res;
}

module.exports = translate
