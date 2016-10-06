import React, { Component, PropTypes } from 'react';

import './autosuggest.css';

const AutosuggestItem = ({ hightlightedIndex, index, label, value }) => (
  <li className={index === hightlightedIndex ? 'active' : null} data-value={value}>{label}</li>
);

AutosuggestItem.propTypes = {
  hightlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
};

class Autosuggest extends Component {
  static propTypes = {
    datalist: PropTypes.arrayOf('string'),
    label: PropTypes.string,
    value: PropTypes.string,
  };

  state = {
    filteredData: [...this.props.datalist],
    hightlightedIndex: 0,
    showItemList: false,
  }

  handleOnChange = (event) => {
    this.filterItemsByValue(event.target.value);

    this.showItemList();
  }

  handleOnFocus = () => {
    this.showItemList();
  }

  handleOnBlur = () => {
    this.hideItemList();
  }

  filterItemsByValue = (inputValue) => {
    const { datalist, label } = this.props;
    const filteredData = datalist.filter((item) => {
      const labelToFilter = label ? item[label] : item;
      return labelToFilter.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
    });

    this.setState({
      filteredData,
      hightlightedIndex: 0,
    });
  }

  hideItemList() {
    this.setState({ showItemList: false });
  }

  showItemList() {
    this.setState({ showItemList: true });
  }

  fillInputSelectedValue = () => {
    const { hightlightedIndex, filteredData } = this.state;
    const { label, value } = this.props;
    const valueToShow =
      label ? filteredData[hightlightedIndex][label] : filteredData[hightlightedIndex];

    this.input.value = valueToShow;

    if (value) {
      this.input.dataset.value = filteredData[hightlightedIndex][value];
    }

    this.hideItemList();
  }

  handleKeyDown = (event) => {
    const { hightlightedIndex, filteredData, showItemList } = this.state;

    switch (event.keyCode) {
      case 13: // enter
        this.fillInputSelectedValue();
        this.filterItemsByValue(this.input.value);
        break;

      case 9: // tab
        this.fillInputSelectedValue();
        break;

      case 27: // escape
        this.hideItemList();
        break;

      case 38: // up
        if (showItemList) {
          const listElementHeight = this.listContainer.childNodes[0].getBoundingClientRect().height;
          let newIndex;

          // allow carousel like selection
          if (hightlightedIndex > 0) {
            newIndex = hightlightedIndex - 1;
          } else {
            newIndex = filteredData.length - 1;
          }

          this.listContainer.scrollTop = newIndex * listElementHeight;
          this.setState({ hightlightedIndex: newIndex });
        } else {
          // allow opening list on arrow press
          this.showItemList();
        }
        break;

      case 40: // down
        if (showItemList) {
          const listElementHeight = this.listContainer.childNodes[0].getBoundingClientRect().height;
          let newIndex;

          // allow carousel like selection
          if (hightlightedIndex < filteredData.length - 1) {
            newIndex = hightlightedIndex + 1;
          } else {
            newIndex = 0;
          }

          this.listContainer.scrollTop = newIndex * listElementHeight;
          this.setState({ hightlightedIndex: newIndex });
        } else {
          // allow opening list on arrow press
          this.showItemList();
        }
        break;

      default:
        // do nothing
    }
  }

  render() {
    const { filteredData, showItemList } = this.state;
    const { label, value } = this.props;

    return (
      <div className="autosuggest" onKeyDown={this.handleKeyDown}>
        <input
          type="text"
          ref={(c) => { this.input = c; }}
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
        />
        {showItemList &&
          <ul ref={(c) => { this.listContainer = c; }}>
            {filteredData.map((item, index) =>
              <AutosuggestItem
                hightlightedIndex={this.state.hightlightedIndex}
                index={index}
                label={label ? item[label] : item}
                value={item[value]}
              />
            )}
          </ul>
        }
      </div>
    );
  }
}

export default Autosuggest;
