import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    getCountries();
  }, []);

  const getCountries = async () => {
    try {
      const { data } = await axios.get(`https://restcountries.com/v2/all `);
      setCountries(data);
      setSearch(data);
    } catch {
      alert("Error");
    }
  };

  const searchCountry = (e) => {
    setSearch(
      countries.filter((country) => {
        return (
          country.region.toLowerCase().includes(e.target.value.toLowerCase()) ||
          country.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
          (country.capital
            ? country.capital
                .toLowerCase()
                .includes(e.target.value.toLowerCase())
            : null)
        );
      })
    );
  };

  const handlesubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="App mx-5 mt-5">
      <h2 className="card-title">COUNTRIES</h2>
      <div>
        <nav className="navbar navbar-light bg-light">
          <div className="container-fluid">
            <form className="d-flex" onSubmit={handlesubmit}>
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchCountry}
              />
            </form>
          </div>
        </nav>
      </div>

      <div className="card">
        <table className="table table-bordered table align-middle ">
          <thead>
            <tr>
              <th scope="col">Flag</th>
              <th scope="col">Name</th>
              <th scope="col">Capital</th>
              <th scope="col">Region</th>
            </tr>
          </thead>
          <tbody>
            {countries
              ? search.map((country) => {
                  return (
                    <tr key={country.index}>
                      <td scope="row">
                        <img
                          src={country.flag}
                          className="img-thumbnail float-center w-25 mx-1"
                          alt="flag"
                        />
                      </td>
                      <td>{country.name}</td>
                      <td>{country.capital}</td>
                      <td>{country.region}</td>
                    </tr>
                  );
                })
              : "LOADİNG..."}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
