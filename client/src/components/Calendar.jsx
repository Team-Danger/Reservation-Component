import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div className="mainCalendar">
        <section>
          <div className="renamethis">
            <div>
              <div>
                <h2>Select Check-in date</h2>
                <div>
                  This host offers 10% off if you stay a week and a 20% monthly discount.
                </div>
              </div>
              <div className="actualCalendar">
                <div>
                  <ul className="days">
                    <li className="daysOfTheWeek">Su</li>
                    <li className="daysOfTheWeek">Mo</li>
                    <li className="daysOfTheWeek">Tu</li>
                    <li className="daysOfTheWeek">We</li>
                    <li className="daysOfTheWeek">Th</li>
                    <li className="daysOfTheWeek">Fr</li>
                    <li className="daysOfTheWeek">Sa</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Calendar;
