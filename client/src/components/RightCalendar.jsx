import React from 'react';
import moment from 'moment';

class RightCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstDay: moment(this.props.currentMonth).add(1, 'months').startOf('month').day(),
      numDaysInMonth: moment(this.props.currentMonth).add(1, 'months').daysInMonth()
    };
  }

  render() {
    const emptyCells = [];
    for (let i = 0; i < this.state.firstDay; i += 1) {
      emptyCells.push(<td className="empty-cell" />);
    }
    const dateCells = [];
    for (let i = 1; i <= this.state.numDaysInMonth; i += 1) {
      dateCells.push(<td className="dates-cell">{i}</td>);
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
        {eachRow.map((eachCell, index) => (
          <td key={index} onClick={() => this.props.handleClick(eachCell)}>{eachCell}</td>
        ))}
      </tr>
    ));

    return (
      <div className="right-calendar">
        <div className="month">
          <h3>{moment(this.state.currentMonth).format('MMMM')}</h3>
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

export default RightCalendar;
