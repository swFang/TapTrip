const axios = require('axios');
const apiEndpoint = require('../config/apiEndpoints');
const keys = require('../config/keys');

const API_PREFIX_PLACES_ID = 'place_id:'
const distanceMatrix = apiEndpoint.distanceMatrix;

function sortAttractions(attractions) { 
    if(attractions != null){
        var destinations = formatPlacesIdForApiCall(attractions);
        var origins = formatPlacesIdForApiCall(attractions, 5);
        getDistances(attractions, destinations, origins);
        //getDistances(attractions, formatPlacesIdForApiCall(attractions));
        return null;
    } 
    const noAttractions = Error('Attractions list was not populated at sortAttraction.js');
    throw noAttractions;
}

function createGraph(attractions) {
    
    attractions.forEach(element => {
        element.place_id
    });
}

function getDistances(attractions, formattedApiString, formattedApiOrigins) {
    // var curidx = 0; 
    // for(var i = 0; i < attractions.length; i += 5) {
    //     axios.get(distanceMatrix, {
    //         params: {
    //             units: 'metric',
    //             origins: formattedApiOrigins[curidx],
    //             destinations: formattedApiString[0],
    //             key: keys.googleAPI
    //         }
    //     }).then((response)=> {
    //         console.log(response.data);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    //     curidx ++; 
    // }
    axios.get(distanceMatrix, {
        params: {
            units: 'metric',
            origins: formattedApiOrigins[0],
            destinations: formattedApiString[0],
            key: keys.googleAPI
        }
    }).then((response)=> {
        console.log(response.data);
        response.data.rows.map(x => console.log(x));
    }).catch((error) => {
        console.log(error);
    });

}

function formatPlacesIdForApiCall(attractions, group = attractions.length) {
    var curIndex = 0; 
    var apiArray = [];
    var apiString = ''

    for( var i = 0; i < attractions.length; i++ ) { 
        if(curIndex < group) {
            curIndex ++; 
        } else { 
            curIndex = 1; 
            apiString = '';
        }

        apiString = apiString + API_PREFIX_PLACES_ID + attractions[i].place_id; 
        if(curIndex != group) {
            apiString = apiString + '|';
        }

        if(curIndex + 1 > group) {
            apiArray.push(apiString);
        }
    }
    return apiArray; 
}
module.exports = sortAttractions;