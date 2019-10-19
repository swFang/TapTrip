const axios = require('axios');
const apiEndpoint = require('../config/apiEndpoints');
const keys = require('../config/keys');

const GRAPH_SIZE = require('./graphSize.js');
const API_PREFIX_PLACES_ID = 'place_id:'
const distanceMatrix = apiEndpoint.distanceMatrix;

async function sortAttractions(attractions, graphSize) { 
    if(attractions != null){
        var destinations = []; 
        formatPlacesIdForApiCall(attractions, GRAPH_SIZE.SMALL, destinations);
        var origins = [];
        formatPlacesIdForApiCall(attractions, 5, origins);
        //console.log(origins);
        var distanceMatrix = await getDistances(attractions, destinations, origins, GRAPH_SIZE.SMALL);
        var sortedList = TSP(distanceMatrix);
        return null;
    } 
    const noAttractions = Error('Attractions list was not populated at sortAttraction.js');
    throw noAttractions;
}

function TSPHelper(distanceMatrix, visited, currPos, total, count, cost, ans, locations) {
    console.log('inside tsp');
    console.log(distanceMatrix[1][0].duration.value)
    if(count == total && distanceMatrix[currPos][0].duration.value > 0) {
        ans = Math.min(ans, cost + distanceMatrix[currPos][0].duration.value);
        locations.push(distanceMatrix[currPos][0]);
        return ans;
    }

    for(var i = 0; i < total; i++) {
        if(visited[i] == false && distanceMatrix[currPos][i] > 0) {
            visited[i] = true; 
            ans = TSPHelper(distanceMatrix, visited, i, total, count++, cost + distanceMatrix[currPos][i].duration.value, ans);
            locations.push(distanceMatrix[currPos][0]);
            visited[i] = false; 
        }
        return ans; 
    }
}

async function TSP(distanceMatrix) {
    var n = distanceMatrix.length; 
    var visited = new Array(n);
    visited.fill(false);
    //console.log(visited); 
    var shortestPath = Number.MAX_SAFE_INTEGER;
    //ans = tsp(graph, v, 0, n, 1, 0, ans); 
    var list = [];
    var shortestPath = await TSPHelper(distanceMatrix, visited, 0, n, 0, shortestPath, list)

    console.log(list);
    console.log(shortestPath); 
}
async function getDistances(attractions, formattedApiString, formattedApiOrigins, graphSize) {
    // matrix dimensions are 20:20, 40:40 or 60:60 max 
    //time and counter variables are to deal with 40/60 matrices which i plan to add at a later date.
    var matrix = [];
    var originsAdr = []
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
                    mode: 'transit',
                    key: keys.googleAPI
                }
            }).then((response)=> {
                    item = response.data.rows;
                    item.map((idx)=> {
                        matrix.push(idx.elements);
                    // names = response.data.origin_addresses;
                    // originsAdr.push(names);
                    // dest = response.data.destination_addresses; 
                });
            }).catch((error) => {
                console.log(error);
            });
            ycounter ++; 
        }
    }
    //console.log(dest);
    // console.log(originsAdr);
    return matrix;
    
}

function formatPlacesIdForApiCall(attractions, group = attractions.length, array) {
    var curIndex = 0; 
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
            array.push(apiString);
        }
    } 
}
module.exports = sortAttractions; 