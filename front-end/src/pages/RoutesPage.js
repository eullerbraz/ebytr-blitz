import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTask from './CreateTask';
import Tasks from './Tasks';
import UpdateTask from './UpdateTask';

const RoutesPage = () => {
  return (
    <Routes>
      <Route path="/" element={ <Tasks /> } />
      <Route path="/create" element={ <CreateTask /> } />
      <Route path="/edit/:id" element={ <UpdateTask /> } />
    </Routes>
  );
}

export default RoutesPage;
