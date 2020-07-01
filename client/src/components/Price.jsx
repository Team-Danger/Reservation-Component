import React from 'react';
import PropTypes from 'prop-types';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { price } = this.props;
    return (
      <div className="price">
        <div className="price-info">
          $
          {' '}
          {price}
        </div>
        <div>
          / night
        </div>
      </div>
    );
  }
}

Price.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Price;
