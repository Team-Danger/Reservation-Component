import React from 'react';
import moment from 'moment';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { FaRegKeyboard } from 'react-icons/fa';

class LeftCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const firstDay = moment(this.props.currentDate).startOf('month').day();
    const numDaysInMonth = moment(this.props.currentDate).daysInMonth();

    // Avail Dates
    const thisMonth = moment(this.props.currentDate).format('MM'); // 06
    // console.log('left cal this month: ', thisMonth);
    const { availDates } = this.props;
    const occupiedDates = [];
    for (let i = 0; i < availDates.length; i += 1) {
      if (thisMonth === availDates[i].slice(5, 7)) {
        occupiedDates.push(Number(availDates[i].slice(-2)));
      }
    }
    // console.log('Occupied From Left', occupiedDates);

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
            <td className="valid-dates" key={index} onClick={() => this.props.handleClick(thisMonth, eachCell)}>
              {eachCell}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <div className="left-calendar">
        <div className="month">
          <IoIosArrowBack className="left-month-arrow-btn" onClick={this.props.handleLeftArrowClick}></IoIosArrowBack>
          <h3>{moment(this.props.currentDate).format('MMMM YYYY')}</h3>
          <IoIosArrowForward className="left-calendar-right-arrow-btn" onClick={this.props.handleRightArrowClick}></IoIosArrowForward>
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
        <div className="calendar-bottom-hidden">
          <div className="keyboard-icon-hidden">
            <FaRegKeyboard />
          </div>
          <div className="clear-dates-btn-container">
            <div className="clear-dates-space"></div>
            <button className="clear-dates-btn-hidden" onClick={this.props.clearButtonClickHandler}>Clear dates</button>
          </div>

        </div>
      </div>
    );
  }
}

export default LeftCalendar;
