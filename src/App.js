import React, { useState, useEffect } from 'react';
import './App.css';

const images = [
    '/4.jpg',
    '/3.jpg',
    '/2.jpg',
    '/5.jpg',
  '/1.jpg',
];

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Daddy's Secret Collection 🌭🍖</h1>
      <div className="slideshow">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`BBQ ${index + 1}`}
            className={index === currentImageIndex ? 'active' : ''}
          />
        ))}
      </div>
      <div className="sausage sausage-top-left">🌭</div>
      <div className="sausage sausage-top-right">🌭</div>
      <div className="sausage sausage-bottom-left">🌭</div>
      <div className="sausage sausage-bottom-right">🌭</div>
    </div>
  );
}

export default App;