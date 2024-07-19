import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import HomeButton from './components/HomeButton';

const App = () => {
  return (
      <Router>
        <div>
          <HomeButton />
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/book/:id" element={<BookDetail />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
