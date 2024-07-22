import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import GuideBook from './pages/GuideBook.page';
import GuideMatching from './pages/GuideMatching.page';
import GuideBookWrite from './pages/GuideBookWrite.page';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/guidematching" element={<GuideMatching />} />
          <Route path="/guidebook" element={<GuideBook />} />
          <Route path="/guidebookwrite" element={<GuideBookWrite />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;