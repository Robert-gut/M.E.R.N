import React from 'react';
import { useRoutes } from './routes';
import 'materialize-css';

function App() {
  const routes = useRoutes(false)
  return (
    <div className='container'>
      {routes}
    </div>
  );
};

export default App;
