function sortAttractions(attractions) { 
    if(attractions != null){
      console.log(attractions);
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

function getDIstances(attractions) {

}
module.exports = sortAttractions;