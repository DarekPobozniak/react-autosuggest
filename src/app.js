import React from 'react';
import { render } from 'react-dom';

import 'index.html';

const App = () => (
  <h2>I'm react hi</h2>
);

const root = document.getElementById('root');

render(<App />, root);

