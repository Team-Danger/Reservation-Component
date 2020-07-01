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
      nextDate: false,
      firstDate: '',
      secondDate: '',
      checkInDate: 'Add date',
      checkOutDate: 'Add date',
      currentDate: moment(new Date()),
    };
    this.handleOpenCalendar = this.handleOpenCalendar.bind(this);
    this.handleCloseCalendar = this.handleCloseCalendar.bind(this);
    this.calendarClickHandler = this.calendarClickHandler.bind(this);
    this.handleLeftArrowClick = this.handleLeftArrowClick.bind(this);
    this.handleRightArrowClick = this.handleRightArrowClick.bind(this);
    this.handleClearDatesClick = this.handleClearDatesClick.bind(this);
  }

  componentDidMount() {
    this.calendarClickHandler();
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

  calendarClickHandler(targetMonth, targetDateInput) {
    const { nextDate } = this.state;
    const { firstDate } = this.state;
    const { secondDate } = this.state;
    const { checkInDate } = this.state;
    const { checkOutDate } = this.state;

    let targetDate = targetDateInput;

    const thisYear = moment(new Date()).format('YYYY');
    if (targetDate < 10) {
      targetDate = `0${targetDate}`;
    }
    this.setState((prevState) => ({
      nextDate: !prevState.nextDate,
    }));
    if (!nextDate) {
      this.setState({
        firstDate: `${thisYear}-${targetMonth}-${targetDate}`,
      });
    } else {
      this.setState({
        secondDate: `${thisYear}-${targetMonth}-${targetDate}`,
      });
    }
    const tempDateOne = firstDate.replace(/-/g, '');
    const tempDateTwo = secondDate.replace(/-/g, '');
    const checkInDateTemp = Math.min(Number(tempDateOne), Number(tempDateTwo)).toString();
    const checkOutDateTemp = Math.max(Number(tempDateOne), Number(tempDateTwo)).toString();

    console.log(checkInDateTemp);
    console.log(checkOutDateTemp);

    if (tempDateOne.length === 8 && tempDateTwo.length === 8) {
      this.setState({
        checkInDate: `${checkInDateTemp.slice(0, 4)}-${checkInDateTemp.slice(4, 6)}-${checkInDateTemp.slice(6, 8)}`,
        checkOutDate: `${checkOutDateTemp.slice(0, 4)}-${checkOutDateTemp.slice(4, 6)}-${checkOutDateTemp.slice(6, 8)}`,
      });
    }
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
      firstDate: '',
      secondDate: '',
    });
  }

  render() {
    const { availDates } = this.props;
    const { currentDate } = this.state;
    const { checkInDate } = this.state;
    const { checkOutDate } = this.state;
    const { showCalendar } = this.state;
    const { firstDate } = this.state;
    const { secondDate } = this.state;

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
                    selectedDates={[firstDate, secondDate]}
                    handleDateClick={this.calendarClickHandler}
                    handleLeftArrowClick={this.handleLeftArrowClick}
                    handleRightArrowClick={this.handleRightArrowClick}
                  />
                </div>

                <div>
                  <BookingRightCalendar
                    availDates={availDates}
                    currentDate={currentDate}
                    selectedDates={[firstDate, secondDate]}
                    handleDateClick={this.calendarClickHandler}
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
                    <button
                      className="modal-footer-clear-dates-btn"
                      type="button"
                      onClick={this.handleClearDatesClick}
                    >
                      Clear dates
                    </button>
                    <div className="modal-footer-close-btn-container">
                      <button
                        className="modal-footer-close-btn"
                        type="button"
                        onClick={this.handleCloseCalendar}
                      >
                        Close
                      </button>
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
