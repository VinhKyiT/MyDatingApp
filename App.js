import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import Hello from './src/Hello.js';
import utilities from './tailwind.json';

const App = () => {
  return (
    <TailwindProvider utilities={utilities}>
      <Hello />
    </TailwindProvider>
  );
};

export default App;
