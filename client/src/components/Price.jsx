import React from 'react';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
    };
  }

  render() {
    return (
      <div className="price">
        <div className="price-info">
          $
          {' '}
          {this.props.price}
        </div>
        <div>
          / night
        </div>
      </div>
    );
  }
}

export default Price;
