import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout/PageLayout';
import Home from './pages/Home';
import ResidenceDetail from './pages/ResidenceDetail';
import Devis from './pages/Devis';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/residence/:id" element={<ResidenceDetail />} />
        <Route path="/devis" element={<Devis />} />
      </Routes>
    </Router>
  );
}

export default App;
