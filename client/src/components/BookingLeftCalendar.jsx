/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
/* eslint-disable react/no-unused-state */
import React from 'react';
import moment from 'moment';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

class BookingLeftCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const firstDay = moment(this.props.currentDate).startOf('month').day();
    const numDaysInMonth = moment(this.props.currentDate).daysInMonth();

    // Avail Dates
    const thisMonth = moment(this.props.currentDate).format('MM');
    const { availDates } = this.props;
    const occupiedDates = [];
    for (let i = 0; i < availDates.length; i += 1) {
      if (thisMonth === availDates[i].slice(5, 7)) {
        occupiedDates.push(Number(availDates[i].slice(-2)));
      }
    }

    // Generate All Number Displayed On Calendar
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
            <td className="valid-dates" key={index} onClick={() => this.props.handleDateClick(thisMonth, eachCell)}>
              {eachCell}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <div className="left-calendar">
        <div className="month">
          <IoIosArrowBack className="left-month-arrow-btn" onClick={this.props.handleLeftArrowClick} />
          <h3>{moment(this.props.currentDate).format('MMMM YYYY')}</h3>
          <IoIosArrowForward className="left-calendar-right-arrow-btn" onClick={this.props.handleRightArrowClick} />

        </div>

        <section>
          <table className="table-body">
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

export default BookingLeftCalendar;
