import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface City {
  name: string;
  image: string;
  description: string;
  population: number;
  area: number;
  weather: string;
  timezone: string;
}

interface CityContextType {
  cityData: City | null;
  fetchCityData: (cityName: string) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cityData, setCityData] = useState<City | null>(null);

  const fetchCityData = async (cityName: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/cities/${cityName}/`);
      setCityData(response.data);
    } catch (error) {
      console.error("Failed to fetch city details.");
    }
  };

  return (
    <CityContext.Provider value={{ cityData, fetchCityData }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
