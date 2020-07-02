import React from 'react';
import PropTypes from 'prop-types';
import { IoIosStar } from 'react-icons/io';

class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { review } = this.props;

    return (
      <div className="star-review">
        <IoIosStar />
        <h2>{review}</h2>
      </div>

    );
  }
}

Review.propTypes = {
  review: PropTypes.number.isRequired,
};

export default Review;
