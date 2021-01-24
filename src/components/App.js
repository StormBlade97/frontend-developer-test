import React from 'react';
import api from '../lib/api';
import Container from '@material-ui/core/Container';
import DataLoader from './DataLoader';
export const App = () => {
  return (
    <Container className="app" fixed>
      <DataLoader key={1} api={api.getUsersDiff}></DataLoader>
      <DataLoader key={2} api={api.getProjectsDiff}></DataLoader>
    </Container>
  );
};

export default App;
