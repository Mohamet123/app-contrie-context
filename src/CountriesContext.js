import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CountriesContext = createContext();

export const useCountries = () => {
  return useContext(CountriesContext);
};

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
        setFilteredCountries(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des pays', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  const fetchCountryDetails = async (alpha3Code) => {
    try {
      const response = await axios.get(`https://restcountries.com/v2/alpha/${alpha3Code}`);
      setCountryDetails(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails du pays', error);
    }
  };
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <CountriesContext.Provider
      value={{
        countries,
        filteredCountries,
        countryDetails,
        searchTerm,
        setSearchTerm,
        fetchCountryDetails,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};
