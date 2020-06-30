import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaRegKeyboard } from 'react-icons/fa';

import LeftCalendar from './LeftCalendar.jsx';
import RightCalendar from './RightCalendar.jsx';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availDates: [],
      currentDate: moment(new Date()),
      leftCalendarSelectdDate: '',
      rightCalendarSelectedDate: '',
    };
    this.leftCalendarClickHandler = this.leftCalendarClickHandler.bind(this);
    this.rightCalendarClickHandler = this.rightCalendarClickHandler.bind(this);
    this.clearButtonClickHandler = this.clearButtonClickHandler.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
  }

  componentDidMount() {
    // console.log('This is currentDate from App.js', this.state.currentDate)
    this.fetchDatesForSelectedListingID();
  }

  fetchDatesForSelectedListingID() {
    const { listingID } = this.props;
    return axios.get(`/api/reservation/${listingID}`)
      .then(({ data }) => {
        // console.log('GET Request Successful: ', data);
        this.setState({
          availDates: data.open_dates,
        });
      })
      .catch((err) => {
        console.log('Error Fetching Data: ', err);
      });
  }



  leftCalendarClickHandler(targetMonth, targetDate) {
    this.setState({
      leftCalendarSelectdDate: `${targetMonth}-${targetDate}`,
    });
  }

  rightCalendarClickHandler(targetMonth, targetDate) {
    this.setState({
      rightCalendarSelectedDate: `${targetMonth}-${targetDate}`,
    });
  }

  clearButtonClickHandler() {
    this.setState({
      rightCalendarSelectedDate: '',
      leftCalendarClickHandler: '',
    });
  }

  handleRightArrowClick() {
    this.setState({
      currentDate: moment(this.state.currentDate).add(1, 'months'),
    });
  }

  handleLeftArrowClick() {
    this.setState({
      currentDate: this.state.currentDate.subtract(1, 'months'),
    });
  }

  render() {
    return (
      <div className="calendar-main-container">
        <div className="calendar-top-descrpiton">
          <h2>Select Check-in date</h2>
          <div>
            This host offers 10% off if you stay a week and a 20% monthly discount.
          </div>
        </div>
        <div className="calendars">
          <LeftCalendar
            availDates={this.state.availDates}
            currentDate={this.state.currentDate}
            handleClick={this.leftCalendarClickHandler}
            handleLeftArrowClick={this.handleLeftArrowClick}
            handleRightArrowClick={this.handleRightArrowClick}
            clearButtonClickHandler={this.clearButtonClickHandler}
          />
          <RightCalendar availDates={this.state.availDates} currentDate={this.state.currentDate} handleClick={this.rightCalendarClickHandler} handleArrowClick={this.handleRightArrowClick} />
        </div>
        <div className="calendar-bottom">
          <div className="keyboard-icon">
            <FaRegKeyboard size={32} />
          </div>
          <div className="clear-dates-btn-container">
            <div className="clear-dates-space" />
            <button className="clear-dates-btn" onClick={this.clearButtonClickHandler}>Clear dates</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
