import React from 'react';
import { Routes, Route, Link ,useParams} from 'react-router-dom';
import { useCountries } from '../CountriesContext';
import { useEffect } from 'react';

export const Contrie = () => {
    const { darkMode, toggleDarkMode } = useCountries();
  return (
    <div className={`container mt-4 ${darkMode ? 'dark-mode' : ''}`}>

         <div className="header">
        <button onClick={toggleDarkMode} className="mode-toggle">
          {darkMode ? 'Mode Clair' : 'Mode Sombre'}
        </button>
      </div>

      <h1 className="display-4 fw-bold">Countries App</h1>
      <nav>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link to="/countries" className="nav-link text-success">Liste des pays</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/countries/*" element={<CountryList />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  return <h2 className="display-5">Bienvenue sur la page d'accueil</h2>;
}

const CountryList = () => {
  const {
    filteredCountries,
    searchTerm,
    setSearchTerm,
  } = useCountries();

  return (
    <div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Rechercher un pays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2 className="display-5">Liste des pays</h2>
      <div className="row">
        {filteredCountries.map(country => (
          <div key={country.alpha3Code} className="col-md-4 mb-3">
            <div className="card">
              <img src={country.flag} className="card-img-top" alt={`${country.name} Flag`} />
              <div className="card-body">
                <h5 className="card-title">{country.name}</h5>
                <a href={`/countries/${country.alpha3Code}`} className="btn btn-primary">Voir les détails</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr />

      <Routes>
        <Route path="/" element={<p className="lead">Veuillez sélectionner un pays.</p>} />
        <Route path="/countries/:alpha3Code" element={<CountryDetails />} />
      </Routes>
    </div>
  );
}

const CountryDetails = () => {
  const { alpha3Code } = useParams();
  const { countryDetails, fetchCountryDetails } = useCountries();

  useEffect(() => {
    fetchCountryDetails(alpha3Code);
  }, [alpha3Code, fetchCountryDetails]);

  if (!countryDetails) {
    return <p className="lead">Chargement en cours...</p>;
  }

  return (
    <div>
      <h3 className="display-6">{countryDetails.name}</h3>
      <img src={countryDetails.flags.svg} alt={`${countryDetails.name} Flag`} style={{ marginBottom: '10px', width: '150px' }} />
      <p>Capitale: {countryDetails.capital}</p>
      <p>Région: {countryDetails.region}</p>
      <p>Population: {countryDetails.population}</p>
    </div>
  );
}
