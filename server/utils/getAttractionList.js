const axios = require('axios');
const apiEndpoints = require('../config/apiEndpoints');
const keys = require('../config/keys');

const placesNearby = apiEndpoints.placesNearby;
const Flatted = require('flatted'); //parses the circular JSON geocoding returns

function formatLongLat(lat, long) {
    console.log('inside formatLonLat, will return ' + lat + ',' + long);
    return lat + ',' + long; 
}

async function callNearbyAPI (location) {
    console.log('inside callnearbyAPI');
    var attractionList; 
    const getlist = await 
        axios.get(placesNearby, {
            params: {
                location: location, 
                radius: 50000,
                type: "tourist_attraction",
                key: keys.googleAPI
            }
        }).then((response)=> {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
}

function getAttractionList(lat, long) {
    //console.log(city)
    var location = formatLongLat(lat, long);
    var list = callNearbyAPI(location);
    console.log(list);
}

module.exports = getAttractionList; 
