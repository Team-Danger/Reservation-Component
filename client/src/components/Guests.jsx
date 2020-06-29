import React from 'react';

import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropdown: false,
      adults: 1,
      children: 0,
      infants: 0,
    };
    this.handleDropdownMenuClick = this.handleDropdownMenuClick.bind(this);
    this.handleAdultMinusIconClick = this.handleAdultMinusIconClick.bind(this);
    this.handleAdultPlusIconClick = this.handleAdultPlusIconClick.bind(this);
    this.handleChildrenMinusIconClick = this.handleChildrenMinusIconClick.bind(this);
    this.handleChildrenPlusIconClick = this.handleChildrenPlusIconClick.bind(this);
    this.handleInfantsMinusIconClick = this.handleInfantsMinusIconClick.bind(this);
    this.handleInfantsPlusIconClick = this.handleInfantsPlusIconClick.bind(this);
  }

  componentDidMount() {
  }

  handleDropdownMenuClick() {
    this.setState((prevState) => ({
      showDropdown: !prevState.showDropdown,
    }));
    this.props.guestsInputHandler(this.state.adults, this.state.children, this.state.infants);
  }

  handleAdultMinusIconClick() {
    this.setState((prevState) => ({
      adults: Math.max(prevState.adults - 1, 1),
    }));
  }

  handleAdultPlusIconClick() {
    this.setState((prevState) => ({
      adults: prevState.adults + 1,
    }));
  }

  handleChildrenMinusIconClick() {
    this.setState((prevState) => ({
      children: Math.max(prevState.children - 1, 0),
    }));
  }

  handleChildrenPlusIconClick() {
    this.setState((prevState) => ({
      children: prevState.children + 1,
    }));
  }

  handleInfantsMinusIconClick() {
    this.setState((prevState) => ({
      infants: Math.max(prevState.infants - 1, 0),
    }));
  }

  handleInfantsPlusIconClick() {
    this.setState((prevState) => ({
      infants: prevState.infants + 1,
    }));
  }

  render() {
    return (
      <div className="guests-box">
        <div className="guests-box-header">
          GUESTS
        </div>
        <div className="guests-box-bottom" role="button" onClick={this.handleDropdownMenuClick}>
          <div className="guests-box-info">
            {this.state.total}
            {' '}
            guests
          </div>

          <div className="guests-box-arrow-icon">
            <IoIosArrowDown size={22} className="down-arrow" />
          </div>

        </div>
        <div className="guests-dropdown-menu-container">
          {this.state.showDropdown
            ? (
              <div className="guests-dropdown-menu">

                <div className="guests-dropdown-adults">
                  <div className="guests-dropdown-adults-text-fixed">
                    Adults
                  </div>
                  <div className="guests-dropdown-interactive">
                    <div className="guests-dropdown-minus-icon"><AiOutlineMinusCircle size={20} onClick={this.handleAdultMinusIconClick} /></div>
                    <div className="guests-dropdown-number">{this.state.adults}</div>
                    <div className="guests-dropdown-plus-icon"><AiOutlinePlusCircle size={20} onClick={this.handleAdultPlusIconClick} /></div>
                  </div>
                </div>

                <div className="guests-dropdown-children">
                  <div className="guests-dropdown-children-text">
                    <div className="guests-dropdown-children-text-fixed">
                      Children
                    </div>
                    <div className="guests-dropdown-children-text-info">
                      Ages 2-12
                    </div>
                  </div>
                  <div className="guests-dropdown-interactive">
                    <div className="guests-dropdown-minus-icon"><AiOutlineMinusCircle size={20} onClick={this.handleChildrenMinusIconClick} /></div>
                    <div className="guests-dropdown-number">{this.state.children}</div>
                    <div className="guests-dropdown-plus-icon"><AiOutlinePlusCircle size={20} onClick={this.handleChildrenPlusIconClick} /></div>
                  </div>
                </div>

                <div className="guests-dropdown-infants">
                  <div className="guests-dropdown-infants-text">
                    <div className="guests-dropdown-infants-text-fixed">
                      Infants
                    </div>
                    <div className="guests-dropdown-infants-text-info">
                      Under 2
                    </div>
                  </div>
                  <div className="guests-dropdown-interactive">
                    <div className="guests-dropdown-minus-icon"><AiOutlineMinusCircle size={20} onClick={this.handleInfantsMinusIconClick} /></div>
                    <div className="guests-dropdown-number">{this.state.infants}</div>
                    <div className="guests-dropdown-plus-icon"><AiOutlinePlusCircle size={20} onClick={this.handleInfantsPlusIconClick} /></div>
                  </div>
                </div>
                <div className="guests-dropdown-info-container">
                  <div className="guests-dropdown-info-text">Infants don’t count toward the number of guests.</div>
                </div>
                <div className="guests-dropdown-close-btn-container">
                  <button onClick={this.handleDropdownMenuClick} className="guests-dropdown-close-btn">Close</button>
                </div>

              </div>

            ) : (
              null
            )}
        </div>
      </div>
    );
  }
}

export default Guests;
