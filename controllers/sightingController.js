const Sighting = require("../models/Sighting");

module.exports = {
  newSighting: function(params) {
    return new Promise((resolve, reject) => {
      const newSighting = new Sighting();

      (newSighting.witness = params.witness),
        (newSighting.seenDate = params.seenDate),
        (newSighting.location = params.location),
        (newSighting.isApproved = false),
        (newSighting.description = params.description);

      newSighting
        .save()
        .then(sighting => {
          resolve(sighting);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  approveSighting: function(req) {
    return new Promise((resolve, reject) => {
      Sighting.findByIdAndUpdate(req.params.id)
        .then(sighting => {
          let approvedSighting = sighting;
          approvedSighting.isApproved = true;
          approvedSighting
            .save()
            .then(savedSighting => {
              resolve(savedSighting);
            })
            .catch(error => {
              reject(error);
            });
          resolve(approvedSighting);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  rejectSighting: function(req) {
    return new Promise((resolve, reject) => {
      Sighting.findByIdAndUpdate(req.params.id)
        .then(sighting => {
          let rejectedSighting = sighting;
          rejectedSighting.isApproved = false;
          rejectedSighting
            .save()
            .then(savedSighting => {
              resolve(savedSighting);
            })
            .catch(error => {
              reject(error);
            });
          resolve(rejectedSighting);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  getAllSightings: function() {
    return new Promise((resolve, reject) => {
      Sighting.find({})
        .then(sightings => {
          resolve(sightings);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  reviewSighting: function(req) {
    return new Promise((resolve, reject) => {
      Sighting.findById(req.params.id)
        .then(sighting => {
          resolve(sighting);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
