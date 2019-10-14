function filterData(attractions) { 
    if(attractions != null){
        var formattedLocations = [];
        attractions.map( (location) => {
            var name = location.name;
            var adr = location.formatted_address;
            var ratingFactor = 5 - location.rating; 
            var edgeWeight = 999999999;
            var prominence = 10; 
            var place_id = location.place_id;
            var formattedLocation = {name, adr, place_id, ratingFactor, prominence, edgeWeight}; 
            formattedLocations.push(formattedLocation);
        });
        return formattedLocations;
    } 
    const noAttractions = Error('Attractions list was not populated at filterAttractionData.js');
    throw noAttractions;
}

module.exports = filterData;