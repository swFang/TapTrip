const axios = require('axios');
const apiEndpoints = require('../config/apiEndpoints');
const keys = require('../config/keys');

const textSearchURL = apiEndpoints.textSearch;
const Flatted = require('flatted');

async function placesOfInterest(city) {
    var listOfPOI;
    var queryParamter = city + '+point+of+interest';
    console.log(queryParamter);
    const temp = await
        axios.get(textSearchURL, {
            params: {
                query: queryParamter,
                inputtype: "textquery",
                key: keys.googleAPI
            }
        }).then((response)=> {
            //console.log(response.data.results);
            listOfPOI = response.data.results;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    return listOfPOI;
}

module.exports = placesOfInterest;