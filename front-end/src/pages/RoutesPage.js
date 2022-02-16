import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './CreateTask';
import Tasks from './Tasks';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={ <Tasks /> } />
      <Route path="/create" element={ <CreateTask /> } />
    </Routes>
  );
}

export default RoutesPage;
