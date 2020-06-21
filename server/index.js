const express = require('express');
const bodyParser = require('body-parser');

const Listings = require('../database/Listing.js');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/api/:id/', (req, res) => {
  const targetId = req.params.id;
  // console.log('Request for ', targetId);
  Listings.findOne({ listing_id: targetId })
    .exec((err, listing) => {
      if (err) {
        // console.log(err);
        res.stats(500).send(err);
      } else {
        res.send(listing);
      }
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = app;
