/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */

import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';

import { FaRegKeyboard } from 'react-icons/fa';
import BookingLeftCalendar from './BookingLeftCalendar.jsx';
import BookingRightCalendar from './BookingRightCalendar.jsx';

class BookingCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      checkInDate: 'Add date',
      checkOutDate: 'Add date',
    };
    this.handleOpenCalendar = this.handleOpenCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.leftCalendarClickHandler = this.leftCalendarClickHandler.bind(this);
    this.rightCalendarClickHandler = this.rightCalendarClickHandler.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
  }

  handleOpenCalendar() {
    this.setState({
      showCalendar: true,
    });
  }

  handleCloseCalendar() {
    this.setState({
      showCalendar: false,
    });
    this.props.checkInOutDatesHandler(this.state.checkInDate, this.state.checkOutDate);
  }

  leftCalendarClickHandler(targetMonth, targetDate) {
    if (targetDate < 10) {
      targetDate = '0' + targetDate;
    }
    const thisYear = moment(new Date()).format('YYYY');
    this.setState({
      checkInDate: `${thisYear}-${targetMonth}-${targetDate}`,
    });
    // console.log('Whats being logged', `${thisYear}-${targetMonth}-${targetDate}`);
  }

  rightCalendarClickHandler(targetMonth, targetDate) {
    if (targetDate < 10) {
      targetDate = '0' + targetDate;
    }
    const thisYear = moment(new Date()).format('YYYY');
    this.setState({
      checkOutDate: `${thisYear}-${targetMonth}-${targetDate}`,
    });
    // console.log('Whats being logged', `${thisYear}-${targetMonth}-${targetDate}`);
  }

  handleRightArrowClick() {
    this.setState({
      currentDate: moment(this.props.currentDate).add(1, 'months'),
    });
  }

  handleLeftArrowClick() {
    this.setState({
      currentDate: this.props.currentDate.subtract(1, 'months'),
    });
  }


  render() {
    Modal.setAppElement('#booking-component');
    // console.log(this.props.availDates);
    return (
      <div className="booking-calendars">

        <div className="booking-calendars-top">
          <div role="button" className="check-in-out-boxes">

            <div className="check-in-box" onClick={this.handleOpenCalendar}>
              <div className="check-in-box-top">
                CHECK IN
              </div>
              <div className="check-in-box-bottom">
                {this.state.checkInDate}
              </div>
            </div>
            <div className="check-out-box" onClick={this.handleOpenCalendar}>
              <div className="check-out-box-top">
                CHECKOUT
              </div>
              <div className="check-out-box-bottom">
                {this.state.checkOutDate}
              </div>
            </div>

            <Modal
              className="sticky-box-calendar-modal"
              isOpen={this.state.showCalendar}
              handleCloseCalendar={this.handleCloseCalendar}
            >
              <div className="booking-calendar-header">
              <div className="booking-calendar-top-description">
                <h2>Select Dates</h2>
                This host offers 10% off if you stay a week and a 20% monthly discount.
              </div>
              <div className="booking-calendar-checkin-checkout-boxes">
              <div className="booking-calendar-check-in-box" onClick={this.handleOpenCalendar}>
                <div className="check-in-box-top">
                  CHECK IN
                </div>
                <div className="check-in-box-bottom">
                  {this.state.checkInDate}
                </div>
              </div>
              <div className="booking-calendar-check-out-box" onClick={this.handleOpenCalendar}>
                <div className="check-out-box-top">
                  CHECKOUT
                </div>
                <div className="check-out-box-bottom">
                  {this.state.checkOutDate}
                </div>
              </div>
              </div>



              </div>


              <div className="booking-calendar-body">
                <div>
                  <BookingLeftCalendar
                    availDates={this.props.availDates}
                    currentDate={this.props.currentDate}
                    handleDateClick={this.leftCalendarClickHandler}
                    handleLeftArrowClick={this.handleLeftArrowClick}
                  />
                </div>

                <div>
                  <BookingRightCalendar
                    availDates={this.props.availDates}
                    currentDate={this.props.currentDate}
                    handleDateClick={this.rightCalendarClickHandler}
                    handleRightArrowClick={this.handleRightArrowClick}
                  />
                </div>
              </div>
              <div className="modal-footer">

                <div className="modal-footer-left">
                  <FaRegKeyboard size={32} />
                </div>

                <div>

                  <div className="modal-footer-right">
                    <div className="modal-footer-clear-dates-btn-container" />
                    <button className="modal-footer-clear-dates-btn" onClick={this.props.clearButtonClickHandler}>Clear dates</button>
                    <div className="modal-footer-close-btn-container">
                      <button className="modal-footer-close-btn" onClick={this.handleCloseCalendar}>Close</button>
                    </div>
                  </div>

                </div>

              </div>

            </Modal>

          </div>

        </div>

      </div>
    );
  }
}

export default BookingCalendar;
