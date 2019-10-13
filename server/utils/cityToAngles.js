const axios = require('axios');
const geoCodingURL = 'https://maps.googleapis.com/maps/api/geocode/json'
const key = ;
const Flatted = require('flatted'); //parses the circular JSON geocoding returns

function translate(city) {
    //console.log(city)
    axios.get(geoCodingURL, {
        params: {
            address: city,
            key: key
        }
    }).then((response)=> {
        let json = Flatted.parse(Flatted.stringify(response));
        console.log(json.data.results[0].geometry.location);
    }).catch((error) => {
        console.log(error);
    });
}

module.exports = translate; 
