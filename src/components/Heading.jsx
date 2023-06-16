import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../storage/UserContext";
import BrandModal from "../modals/BrandModal";
import CarsContext from "../storage/CarsContext";

const Heading = () => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [filteredModels, setFilteredModels] = useState([]);

  const { cars } = useContext(CarsContext);

  const { user, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBrand) {
      const filtered = cars.filter((car) => car.brand === selectedBrand);
      setFilteredModels(filtered);
    } else {
      setFilteredModels(cars);
    }
  }, [selectedBrand, cars]);

  const handleSignOut = () => {
    signOutUser();
    navigate("/signin"); 
  };

  return (
    <div className="container">
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <span className="fs-4">Used Cars</span>
        </Link>
        <ul className="nav nav-pills align-self-center">
          <li className="nav-item">
            <BrandModal
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
              filteredModels={filteredModels}
            />
          </li>
        </ul>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <Link to="/cars" className="nav-link" aria-current="page">
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              Add Car
            </Link>
          </li>
          {user.id ? (
             <>
             <li className="nav-item">
               <button className="nav-link" onClick={handleSignOut}>
                 Sign Out
               </button>
             </li>
           </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/signin" className="nav-link">
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};
export default Heading;