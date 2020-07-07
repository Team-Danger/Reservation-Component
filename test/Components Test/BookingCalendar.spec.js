import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BookingCalendar from '../../client/src/components/BookingCalendar.jsx';

configure({ adapter: new Adapter() });

describe('BookingCalendar Component', () => {
  it('should render correctly when given a valid listing ID', () => {
    const testOpenDates = ['2020-07-20', '2020-07-21', '2020-07-22', '2020-07-23', '2020-07-24'];
    const checkInOutDatesHandler = (checkInDate, checkOutDate) => {
      this.setState({
        checkInDate,
        checkOutDate,
      });
    };

    const component = shallow(<BookingCalendar availDates={testOpenDates} checkInOutDatesHandler={checkInOutDatesHandler} />);

    expect(component).toMatchSnapshot();
  });
});
