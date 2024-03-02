import React from 'react';
import Resume from './components/Resume/Resume'; // Import your Resume component
import Header from './components/Header/header'; // Import your Header component
import './App.css'; // Import your App.css file



function App () {
  return (
    <div className="App"> {/* Apply the gradient background styles here */}
      <Header />
      <Resume />
    </div>
  )
};
export default App;