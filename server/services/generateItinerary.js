const translate = require('../utils/cityToAngles');
const getAttractionList = require ('../utils/getAttractionList');


async function generateItinerary(city) {
    console.log('gen itinerary');
    let latlong = await translate(city);
    console.log('came back from translate, res was ' + latlong);
    var list = getAttractionList(latlong.lat, latlong.lng);
    //console.log('got out of getAttractionList, res was ' + list);
}

module.exports = generateItinerary;