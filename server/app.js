const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'client', 'dist');

const Listings = require('../database/Listing.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(DIST_DIR));

app.get('/api/reservation/:id/', (req, res) => {
  const targetId = req.params.id;
  Listings.findOne({ listing_id: targetId })
    .exec()
    .then((listing) => {
      if (listing === null) {
        res.status(204).send();
      } else {
        res.status(200).send(listing);
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put('/api/reservation/:id/', (req, res) => {
  const targetId = req.params.id;

  Listings.updateOne({ listing_id: targetId })
    .exec()
    .then(res.status(201).send())
    .catch((error) => {
      res.status(500).send(error);
    });
});
module.exports = app;
