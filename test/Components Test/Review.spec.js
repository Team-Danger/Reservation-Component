import React from 'react';
import { shallow, configure } from 'enzyme';
import Review from '../../client/src/components/Review.jsx';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Review Component', () => {
  it('should render correctly when given a valid listing ID', () => {
    const component = shallow(<Review review={4} />);

    expect(component).toMatchSnapshot();
  });
});
