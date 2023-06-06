import React, {useState, useEffect} from "react";
import Card from "../component/cards.jsx";
import Pagination from "../component/pagination.jsx";
import {GetAllCompanies} from "../services/company.js";
import Search from "../component/search.jsx";
import Spinner from "../component/Spinner.jsx";
import Filter from "../component/Filter.jsx";
import {provincias} from "../component/form-province.jsx";
import {calculateAverageRating} from "../component/AverageRating.jsx";
import {Navbar} from "../component/navbar.js";
import "../../styles/all-companies.css";
import Alert from "../component/Alert.jsx";

export const AllCompanies = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [spinner, setSpinner] = useState(false);
  const [filter, setFilter] = useState("");
  const [minAverageRating, setMinAverageRating] = useState(0);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [className, setClassName] = useState("");

  const fetchData = async () => {
    try {
      setSpinner(true);
      const info = await GetAllCompanies();
      setUser(info.data);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      setAlert(true);
      setMessage("error al traer los datos");
      setClassName("danger");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredUsers = user
    .filter((i) => {
      const nameMatch = i.name.toLowerCase().includes(search.toLowerCase());
      const addressMatch = i.company.address
        .toLowerCase()
        .includes(search.toLowerCase());
      const provinceMatch = i.company.province
        .toLowerCase()
        .includes(search.toLowerCase());
      const emailMatch = i.email.toLowerCase().includes(search.toLowerCase());

      return nameMatch || addressMatch || provinceMatch || emailMatch;
    })
    .filter((i) => {
      return filter
        ? i.company.province.toLowerCase() === filter.toLowerCase()
        : true;
    })
    .filter((i) => {
      const averageRating = calculateAverageRating(i.received_reviews);
      return averageRating >= minAverageRating;
    });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <>
          <div className="all-companies">
            <Navbar />
            <h1 className="text-center m-3"> Nuestras empresas</h1>

            {alert && (
              <div className="d-flex justify-content-center m-5">
                <Alert className={className} message={message} />
              </div>
            )}
            <Search setSearch={setSearch} />
            <div className="container p-3">
              <div className="row">
                <div className="col-md-3">
                  <Filter
                    filter={filter}
                    setFilter={setFilter}
                    minAverageRating={minAverageRating}
                    setMinAverageRating={setMinAverageRating}
                    provinces={provincias}
                  />
                </div>
                <div className="col-md-8 d-flex justify-content-md-center">
                  <div className="row">
                    {paginatedUsers.map((user, key) => {
                      const averageRating = calculateAverageRating(
                        user.received_reviews
                      );
                      return (
                        <Card
                          key={key}
                          avatar={user.avatar}
                          name={user.name}
                          province={user.company.province}
                          email={user.email}
                          address={user.company.address}
                          category={"company"}
                          id={user.id}
                          averageRating={averageRating}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row mt-3">
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
