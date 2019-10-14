const translate = require('../utils/cityToAngles');
const getAttractionList = require ('../utils/getAttractionList');
const placesOfInterest = require('../utils/getPlacesOfInterest');
const filterData = require('../utils/filterAttractionData');
const sortAttractions = require('../utils/sortAttractions');

async function generateItinerary(city) {
    // console.log('gen itinerary');
    // let latlong = await translate(city);
    // console.log('came back from translate, res was ' + latlong);
    // var list = getAttractionList(latlong.lat, latlong.lng);
    //console.log('got out of getAttractionList, res was ' + list);
    try {
        var attractions = await placesOfInterest(city);
        var filteredAttractions = filterData(attractions);
        var sortedList = sortAttractions(filteredAttractions)
    } catch (err) {
        console.log(err);
    }
    //console.log(attractions);

}

module.exports = generateItinerary;