/* eslint-disable import/extensions */
import React from 'react';
import axios from 'axios';
import moment from 'moment';

import LeftCalendar from './LeftCalendar.jsx';
import RightCalendar from './RightCalendar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availDates: [],
      currentMonth: moment(),
      leftCalendarSelectdDate: '',
      rightCalendarSelectedDate: '',
    };
    this.leftCalendarClickHandler = this.leftCalendarClickHandler.bind(this);
    this.rightCalendarClickHandler = this.rightCalendarClickHandler.bind(this);
  }

  componentDidMount() {
    this.fetchDatesForSelectedListingID();
  }

  fetchDatesForSelectedListingID() {
    return axios.get(`/api/${this.props.listingID}`)
      .then(({ data }) => {
        console.log('GET Request Successful: ', data);
        this.setState({
          availDates: data.open_dates,
        });
      })
      .catch((err) => {
        console.log('Error Fetching Data: ', err);
      });
  }

  leftCalendarClickHandler(targetDate) {
    this.setState({
      leftCalendarSelectdDate: targetDate,
    });
    console.log(targetDate.props.children);
  }

  rightCalendarClickHandler(targetDate) {
    this.setState({
      rightCalendarSelectedDate: targetDate,
    });
    console.log(targetDate.props.children);
  }

  render() {
    return (
      <div className="calendar-component">
        <div className="calendar-top-descrpiton">
          <h2>Select Check-in date</h2>
          <div>
            This host offers 10% off if you stay a week and a 20% monthly discount.
          </div>
        </div>
        <div className="calendars">
          <LeftCalendar currentMonth={this.state.currentMonth} handleClick={this.leftCalendarClickHandler} />
          <RightCalendar currentMonth={this.state.currentMonth} handleClick={this.rightCalendarClickHandler} />
        </div>
      </div>
    );
  }
}

export default App;
