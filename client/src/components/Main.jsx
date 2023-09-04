import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Error from '../pages/Error';

const Main = () => {
  return (
    <div style={{ height: '95vh' }} className=''>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </div>
  );
};

export default Main;
