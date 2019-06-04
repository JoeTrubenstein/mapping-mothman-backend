const Sighting = require("../models/Sighting");

module.exports = {
  newSighting: function(params) {
    return new Promise((resolve, reject) => {
      const newSighting = new Sighting();

      newSighting.witness = params.witness,
      newSighting.seenDate = params.seenDate,
      newSighting.location = params.location,
      newSighting.description = params.description

      newSighting.save()
      .then( sighting => {
          resolve(sighting)
      })
      .catch(error => {
          console.log(error)
          reject(error)
      })
    });
  }
};
