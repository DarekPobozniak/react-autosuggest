import React, { PropTypes } from 'react';

const AutosuggestItem = ({ hightlightedIndex, index, label, value }) => (
  <li className={index === hightlightedIndex ? 'active' : null} data-value={value}>{label}</li>
);

AutosuggestItem.propTypes = {
  hightlightedIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  label: PropTypes.string,
  value: PropTypes.string,
};

export default AutosuggestItem;
