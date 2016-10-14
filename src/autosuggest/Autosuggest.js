import React, { Component, PropTypes } from 'react';

import './autosuggest.css';

const AutosuggestItem = ({ hightlightedIndex, index, label, value }) => (
  <li className={index === hightlightedIndex ? 'active' : null} data-value={value}>{label}</li>
);

AutosuggestItem.propTypes = {
  hightlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
};

class Autosuggest extends Component {
  static propTypes = {
    currentValue: PropTypes.string,
    datalist: PropTypes.arrayOf(PropTypes.object),
    label: PropTypes.string,
    labelKey: PropTypes.string,
    value: PropTypes.string,
  };

  state = {
    filteredData: [...this.props.datalist],
    hightlightedIndex: 0,
    showItemList: false,
    currentValue: null,
    currentDataValue: null,
  }

  componentWillMount() {
    const { label, value, labelKey, currentValue } = this.props;

    if (currentValue) {
      const currentSelectedItem = this.props.datalist.filter(item =>
        item[value] === currentValue
      );
      let valueToShow;

      if (labelKey) {
        valueToShow = currentSelectedItem[0][label][labelKey];
      } else {
        valueToShow = currentSelectedItem[0][label];
      }

      this.filterItemsByValue(valueToShow);

      this.setState({ currentValue: valueToShow });
      this.setState({ currentDataValue: currentValue });
    }
  }

  handleOnChange = (event) => {
    this.filterItemsByValue(event.target.value);
    this.setState({ currentValue: event.target.value });
    this.showItemList();
  }

  handleOnFocus = () => {
    this.showItemList();
  }

  handleOnBlur = () => {
    this.hideItemList();
  }

  filterItemsByValue = (inputValue) => {
    const { datalist, label, labelKey } = this.props;
    const filteredData = datalist.filter((item) => {
      let labelToFilter;

      if (label) {
        if (labelKey) {
          labelToFilter = item[label][labelKey];
        } else {
          labelToFilter = item[label];
        }
      } else {
        labelToFilter = item;
      }

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
    const { label, value, labelKey } = this.props;
    const item = filteredData[hightlightedIndex];
    let itemLabel;

    if (label) {
      if (labelKey) {
        itemLabel = item[label][labelKey];
      } else {
        itemLabel = item[label];
      }
    } else {
      itemLabel = item;
    }

    this.setState({ currentValue: itemLabel });

    if (value) {
      this.setState({ currentDataValue: item[value] });
    }

    this.hideItemList();
  }

  handleKeyDown = (event) => {
    const { hightlightedIndex, filteredData, showItemList } = this.state;

    switch (event.keyCode) {
      case 13: // enter
        this.fillInputSelectedValue();
        this.filterItemsByValue(event.target.value);
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
    const { filteredData, showItemList, currentValue, currentDataValue } = this.state;
    const { label, value, labelKey } = this.props;
    let itemLabel;

    return (
      <div className="autosuggest" onKeyDown={this.handleKeyDown}>
        <input
          type="text"
          onChange={this.handleOnChange}
          onFocus={this.handleOnFocus}
          onBlur={this.handleOnBlur}
          value={currentValue}
          data-value={currentDataValue}
        />
        {showItemList &&
          <ul ref={(c) => { this.listContainer = c; }}>
            {filteredData.map((item, index) => {
              if (label) {
                if (labelKey) {
                  itemLabel = item[label][labelKey];
                } else {
                  itemLabel = item[label];
                }
              } else {
                itemLabel = item;
              }

              return (
                <AutosuggestItem
                  key={index}
                  hightlightedIndex={this.state.hightlightedIndex}
                  index={index}
                  label={itemLabel}
                  value={item[value]}
                />
              );
            })}
          </ul>
        }
      </div>
    );
  }
}

export default Autosuggest;
