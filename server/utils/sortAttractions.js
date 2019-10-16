const axios = require('axios');
const apiEndpoint = require('../config/apiEndpoints');
const keys = require('../config/keys');

const GRAPH_SIZE = require('./graphSize.js');
const API_PREFIX_PLACES_ID = 'place_id:'
const distanceMatrix = apiEndpoint.distanceMatrix;

function sortAttractions(attractions, graphSize) { 
    if(attractions != null){
        var destinations = formatPlacesIdForApiCall(attractions, GRAPH_SIZE.SMALL);
        var origins = formatPlacesIdForApiCall(attractions, 5);
        var distanceMatrix = getDistances(attractions, destinations, origins, GRAPH_SIZE.SMALL);

        return null;
    } 
    const noAttractions = Error('Attractions list was not populated at sortAttraction.js');
    throw noAttractions;
}

async function getDistances(attractions, formattedApiString, formattedApiOrigins, graphSize) {
    // matrix dimensions are 20:20, 40:40 or 60:60 max 
    //time and counter variables are to deal with 40/60 matrices which i plan to add at a later date.
    var matrix = [];
    var yTimes = graphSize/5;
    var xTimes = graphSize/20;
    var ycounter = 0;
    var xcounter = 0;

    for(var x = 0 ; x < xTimes; x ++) {
        for(var i = 0; i < yTimes; i++) {
            temp = await
            axios.get(distanceMatrix, {
                params: {
                    units: 'metric',
                    origins: formattedApiOrigins[ycounter],
                    destinations: formattedApiString[0],
                    key: keys.googleAPI
                }
            }).then((response)=> {
                item = response.data.rows;
                item.map((idx)=> {
                    matrix.push(idx.elements)
                });
            }).catch((error) => {
                console.log(error);
            });
        }
        ycounter ++; 
    }
    return matrix;
    
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