import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Calendar from '../../client/src/components/Calendar.jsx';

require('babel-polyfill');

configure({ adapter: new Adapter() });

describe('Calendar Component', () => {
  jest.setTimeout(90000);
  it('should render correctly when given a valid listing ID', async () => {
    const component = await shallow(<Calendar listingID="025" />);

    expect(component).toMatchSnapshot();
  });
});
