import React from 'react';
import { shallow, configure } from 'enzyme';
import Booking from '../../client/src/components/Booking.jsx';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Booking Component', () => {
  it('should render correctly when given a valid listing ID', () => {
    const component = shallow(<Booking listingID="025" />);

    expect(component).toMatchSnapshot();
  });
});
