import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Autosuggest from '../../dist/main';
import AutosuggestItem from '../autosuggest/AutosuggestItem';

const simpleList = ['John', 'Anna', 'Darek', 'David'];

describe('Autosuggest component is rendered', () => {
  const minProps = {
    datalist: simpleList,
    currentValue: 'Darek',
  };

  const wrapper = shallow(
    <Autosuggest {...minProps} />
  );

  it('Renders without exploding', () => {
    expect(shallow(<Autosuggest {...minProps} />).length).to.equal(1);
  });

  it('Should toggle `ul` list on state change', () => {
    expect(wrapper.find('ul')).to.have.length(0);
    wrapper.setState(({ showItemList: true }));
    expect(wrapper.find('ul')).to.have.length(1);
  });
});

describe('AutosuggestItem component is rendered', () => {
  const minProps = {
    datalist: simpleList,
  };

  const wrapper = shallow(<Autosuggest {...minProps} />);
  wrapper.setState(({ showItemList: true }));

  it('Should be shown the number of times', () => {
    expect(wrapper.find('AutosuggestItem')).to.have.length(4);
  });

  it('Each item has `li` element', () => {
    wrapper.find('AutosuggestItem').forEach(node =>
      expect(node.shallow().find('li')).to.have.length(1)
    );
  });

  it('Olny active item should have class `active`', () => {
    expect(shallow(
      <AutosuggestItem
        hightlightedIndex={1}
        index={1}
      />
    ).find('.active')).to.have.length(1);

    expect(shallow(
      <AutosuggestItem
        hightlightedIndex={0}
        index={1}
      />
    ).find('.active')).to.have.length(0);
  });
});

