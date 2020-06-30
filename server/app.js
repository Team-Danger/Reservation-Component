const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');

const Listings = require('../database/Listing.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(DIST_DIR));

app.get('/api/:id/reservation', (req, res) => {
  Listings.findOne({ listing_id: req.params.id })
    .exec()
    .then((listing) => {
      if (listing === null) {
        throw new Error('Error');
      }
      res.send(listing);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put('api/:id/', (req, res) => {
  const targetId = req.params.id;
  Listings.updateOne({ listing_id: targetId })
    .exec()
    .then(res.status(201).send())
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = app;
