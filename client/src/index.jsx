import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import Booking from './components/Booking.jsx';

ReactDOM.render(
  <div className="booking-combined">
    <Calendar listingID="025" />
    <Booking listingID="025" />
  </div>,
  document.getElementById('booking-component'),
);
