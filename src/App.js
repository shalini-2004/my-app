import React, { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import BookList from './Components/BookList';
// import Sidebar from './Components/Sidebar';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // const handleSearch = (query) => {
  //   setSearchQuery(query);
  // };

  return (
    <>
      <Navbar />
      <BookList query={searchQuery} />
       
    </>
  );
}

export default App;
