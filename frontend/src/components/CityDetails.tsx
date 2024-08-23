import React, { useState, useEffect } from 'react';

function CityDetails({ cityName }: { cityName: string }) {
  const [cityDetails, setCityDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/cities/${cityName}/`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch city details.');
        }
        return response.json();
      })
      .then(data => {
        setCityDetails(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [cityName]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!cityDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{cityName}</h2>
      <p>{cityDetails.description}</p>
      <img src={`http://127.0.0.1:8000/media/${cityDetails.image}`} alt={cityName} />
    </div>
  );
}

export default CityDetails;
