// import React from 'react';
// import WeatherDashboard from './pages/WeatherDashboard';
// import './App.css';

// const App = () => {
//   return (
//     <div className="App">
//       <WeatherDashboard />
//     </div>
//   );
// };

// export default App;
// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './pages/WeatherDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<WeatherDashboard />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
