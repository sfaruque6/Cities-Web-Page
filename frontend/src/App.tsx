import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListGroup from './components/ListGroup';

interface City {
  id: number;
  name: string;
  image: string;
  description: string;
}

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/cities/')
      .then(response => {
        setCities(response.data);
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }, []);


const baseURL = 'http://127.0.0.1:8000/media/images/';
const fetchCities = () => {
  axios.get<City[]>('http://127.0.0.1:8000/api/cities/')
    .then(response => {
      const citiesWithFullImagePath = response.data.map(city => ({
        ...city,
        image: `${baseURL}${city.image}`, // Ensure full path
      }));
      setCities(citiesWithFullImagePath);
    })
    .catch(error => {
      console.error('Error fetching cities:', error);
    });
};


  const handleSelectItem = (city: City) => {
    setSelectedCity(city);
  };

  const handleDelete = (id: number) => {
    axios.delete(`http://127.0.0.1:8000/api/cities/${id}/`)
      .then(() => {
        setCities(cities.filter(city => city.id !== id));
        setSelectedCity(null); // Clear selected city after deletion
      })
      .catch(error => {
        console.error('Error deleting city:', error);
      });
  };

  return (
    <div>
      <ListGroup items={cities} heading="Cities" onSelectItem={handleSelectItem} />
      {selectedCity && (
        <div>
          <h2>{selectedCity.name}</h2>
          <img 
            src={selectedCity.image} 
            alt={selectedCity.name} 
            style={{ width: '300px', height: '200px', objectFit: 'cover' }} 
          />
          <p>{selectedCity.description}</p>
          <button onClick={() => handleDelete(selectedCity.id)}>Delete City</button>
        </div>
      )}
    </div>
  );
}

export default App;