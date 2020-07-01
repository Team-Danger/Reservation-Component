/* eslint-disable react/no-array-index-key */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

class BookingLeftCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { availDates } = this.props;
    const { currentDate } = this.props;
    const { handleLeftArrowClick } = this.props;
    const { handleRightArrowClick } = this.props;
    const { handleDateClick } = this.props;

    const firstDay = moment(currentDate).startOf('month').day();
    const numDaysInMonth = moment(currentDate).daysInMonth();

    const thisMonth = moment(currentDate).format('MM');

    const occupiedDates = [];
    for (let i = 0; i < availDates.length; i += 1) {
      if (thisMonth === availDates[i].slice(5, 7)) {
        occupiedDates.push(Number(availDates[i].slice(-2)));
      }
    }

    const emptyCells = [];
    for (let i = 0; i < firstDay; i += 1) {
      emptyCells.push('');
    }
    const dateCells = [];
    for (let i = 1; i <= numDaysInMonth; i += 1) {
      dateCells.push(i);
    }
    const totalCells = [...emptyCells, ...dateCells];
    const tableRowsArr = [];
    let singleRow = [];
    totalCells.forEach((cell, index) => {
      if ((index % 7) !== 0) {
        singleRow.push(cell);
      } else {
        const aFullRow = singleRow.slice();
        tableRowsArr.push(aFullRow);
        singleRow = [];
        singleRow.push(cell);
      }
      if (index === totalCells.length - 1) {
        const lastRow = singleRow.slice();
        tableRowsArr.push(lastRow);
      }
    });
    const calendarDateCells = tableRowsArr.map((eachRow, index) => (
      <tr key={index}>
        {eachRow.map((eachCell, index) => {
          if (occupiedDates.indexOf(eachCell) !== -1 || eachCell === '') {
            return (
              <td className="invalid-dates" key={index}>
                {eachCell}
              </td>
            );
          }
          return (
            <td
              className="valid-dates"
              role="gridcell"
              key={index}
              onClick={() => handleDateClick(thisMonth, eachCell)}
            >
              {eachCell}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <div className="left-calendar">
        <div className="month">
          <IoIosArrowBack className="left-month-arrow-btn" onClick={handleLeftArrowClick} />
          <h3>{moment(currentDate).format('MMMM YYYY')}</h3>
          <IoIosArrowForward className="left-calendar-right-arrow-btn" onClick={handleRightArrowClick} />

        </div>

        <section>
          <table className="table-body" role="grid">
            <tbody>
              <tr className="day-of-the-week">
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
              {calendarDateCells}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

BookingLeftCalendar.propTypes = {
  availDates: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDateClick: PropTypes.func.isRequired,
  handleLeftArrowClick: PropTypes.func.isRequired,
  handleRightArrowClick: PropTypes.func.isRequired,
};

export default BookingLeftCalendar;
