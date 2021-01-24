import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import DataLoader from './DataLoader';

describe('<App />', () => {
  describe('renders', () => {
    it('renders', () => {
      expect(shallow(<App />).getElement()).toMatchSnapshot();
    })
    it('renders two DataLoader', () => {
      expect(shallow(<App />).find(DataLoader).length).toBe(2);
    })
  });
});
