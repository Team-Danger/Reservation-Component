import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/Calendar.jsx';
import Booking from './components/Booking.jsx';

ReactDOM.render(
  <Calendar listingID="025" />,
  document.getElementById('calendar-component'),
);

ReactDOM.render(
  <Booking listingID="025" />,
  document.getElementById('booking-component'),
);
