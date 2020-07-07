import React from 'react';
import { shallow, configure } from 'enzyme';
import Price from '../../client/src/components/Price.jsx';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Price Component', () => {
  it('should render correctly when given a valid listing ID', () => {
    const component = shallow(<Price price={100} />);

    expect(component).toMatchSnapshot();
  });
});
