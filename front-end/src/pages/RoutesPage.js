import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Tasks from './Tasks';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={ <Tasks /> } />
    </Routes>
  );
}

export default RoutesPage;
