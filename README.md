# react-autosuggest
Imitating native html5 autocomplete with react

## Installation

```shell
git clone https://github.com/DarekPobozniak/react-autosuggest.git
cd react-autosuggest
npm install
```

## Start
```shell
npm start
```

## Installation

```shell
npm install react-autosuggestive --save
```

## Basic Usage

```js
import Autosuggest from 'react-autosuggestive';

// Basic list of names
const names = ['Anna', 'John', 'Darek', 'David'];

<Autosuggest
  datalist={names}
/>

// Basic list of names with selected default value
<Autosuggest
  datalist={names}
  currentValue="Darek"
/>

// List of countries with codes
const countries = [
  { name: 'Poland', code: 'PL' },
  { name: 'Germany', code: 'DE' },
  { name: 'Czech Republic', code: 'CZ' },
];

<Autosuggest
  datalist={countries}
  label="name"
  value="code"
  currentValue="CZ"
/>

// List of localized county names with codes
const localizedCountries = [
  {
    name: {
      en_gb: 'Poland',
      pl: 'Polska',
    },
    code: 'PL',
  },
  {
    name: {
      en_gb: 'Germany',
      pl: 'Niemcy',
    },
    code: 'DE',
  },
  {
    name: {
      en_gb: 'Czech Republic',
      pl: 'Czechy',
    },
    code: 'CZ',
  },
];

<Autosuggest
  datalist={countries}
  label="name"
  value="code"
  currentValue="CZ"
  labelKey="pl"
/>
