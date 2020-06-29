import React from 'react';

import { IoIosStar } from 'react-icons/io';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: '',
    };
  }

  render() {
    return (
      <div className="star-review">
        <IoIosStar />
        <h2>{this.props.review}</h2>
      </div>

    );
  }
}

export default Review;
