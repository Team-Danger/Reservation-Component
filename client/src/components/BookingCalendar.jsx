import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import PropTypes from 'prop-types';

import { FaRegKeyboard } from 'react-icons/fa';
import BookingLeftCalendar from './BookingLeftCalendar';
import BookingRightCalendar from './BookingRightCalendar';

class BookingCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCalendar: false,
      checkInDate: 'Add date',
      checkOutDate: 'Add date',
      currentDate: moment(new Date()),
    };
    this.handleOpenCalendar = this.handleOpenCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.leftCalendarClickHandler = this.leftCalendarClickHandler.bind(this);
    this.rightCalendarClickHandler = this.rightCalendarClickHandler.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleClearDatesClick = this.handleClearDatesClick.bind(this);
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
    const { checkInOutDatesHandler } = this.props;
    const { checkInDate } = this.state;
    const { checkOutDate } = this.state;

    checkInOutDatesHandler(checkInDate, checkOutDate);
  }

  leftCalendarClickHandler(targetMonth, targetDateInput) {
    let targetDate = targetDateInput;
    if (targetDate < 10) {
      targetDate = `0${targetDate}`;
    }
    const thisYear = moment(new Date()).format('YYYY');
    this.setState({
      checkInDate: `${thisYear}-${targetMonth}-${targetDate}`,
    });
  }

  rightCalendarClickHandler(targetMonth, targetDateInput) {
    let targetDate = targetDateInput;
    if (targetDate < 10) {
      targetDate = `0${targetDate}`;
    }
    const thisYear = moment(new Date()).format('YYYY');
    this.setState({
      checkOutDate: `${thisYear}-${targetMonth}-${targetDate}`,
    });
    console.log('Whats being logged', `${thisYear}-${targetMonth}-${targetDate}`);
  }

  handleRightArrowClick() {
    const { currentDate } = this.state;

    this.setState({
      currentDate: currentDate.add(1, 'months'),
    });
  }

  handleLeftArrowClick() {
    const { currentDate } = this.state;

    this.setState({
      currentDate: currentDate.subtract(1, 'months'),
    });
  }

  handleClearDatesClick() {
    this.setState({
      checkInDate: 'Add date',
      checkOutDate: 'Add date',
    });
  }

  render() {
    const { availDates } = this.props;
    const { currentDate } = this.state;
    const { checkInDate } = this.state;
    const { checkOutDate } = this.state;
    const { showCalendar } = this.state;

    return (
      <div className="booking-calendars">

        <div className="booking-calendars-top">
          <div role="button" className="check-in-out-boxes">

            <div
              className="check-in-box"
              role="button"
              onClick={this.handleOpenCalendar}
            >
              <div className="check-in-box-top">
                CHECK IN
              </div>
              <div className="check-in-box-bottom">
                {checkInDate}
              </div>
            </div>
            <div
              className="check-out-box"
              role="button"
              onClick={this.handleOpenCalendar}
            >
              <div className="check-out-box-top">
                CHECKOUT
              </div>
              <div className="check-out-box-bottom">
                {checkOutDate}
              </div>
            </div>

            <Modal
              className="sticky-box-calendar-modal"
              isOpen={showCalendar}
              handleCloseCalendar={this.handleCloseCalendar}
            >
              <div className="booking-calendar-header">
                <div className="booking-calendar-top-description">
                  <h2>Select Dates</h2>
                  This host offers 10% off if you stay a week and a 20% monthly discount.
                </div>
                <div className="booking-calendar-checkin-checkout-boxes">
                  <div
                    className="booking-calendar-check-in-box"
                    onClick={this.handleOpenCalendar}
                  >
                    <div className="check-in-box-top">
                      CHECK IN
                    </div>
                    <div className="check-in-box-bottom">
                      {checkInDate}
                    </div>
                  </div>
                  <div
                    className="booking-calendar-check-out-box"
                    onClick={this.handleOpenCalendar}
                  >
                    <div className="check-out-box-top">
                      CHECKOUT
                    </div>
                    <div className="check-out-box-bottom">
                      {checkOutDate}
                    </div>
                  </div>
                </div>

              </div>

              <div className="booking-calendar-body">
                <div>
                  <BookingLeftCalendar
                    availDates={availDates}
                    currentDate={currentDate}
                    handleDateClick={this.leftCalendarClickHandler}
                    handleLeftArrowClick={this.handleLeftArrowClick}
                    handleRightArrowClick={this.handleRightArrowClick}
                  />
                </div>

                <div>
                  <BookingRightCalendar
                    availDates={availDates}
                    currentDate={currentDate}
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
                    <button className="modal-footer-clear-dates-btn" onClick={this.handleClearDatesClick}>Clear dates</button>
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

BookingCalendar.propTypes = {
  availDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkInOutDatesHandler: PropTypes.func.isRequired,
};

export default BookingCalendar;
