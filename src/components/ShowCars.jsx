import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CarsContext from "../storage/CarsContext";
import { deleteCarById, getCars } from "../service/carService";
import UserContext from "../storage/UserContext";

const ShowCars = () => {
  const { cars, updateCar } = useContext(CarsContext);
  const { signedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    getCars().then(({ data }) => updateCar(data));
  }, []);

  const handleDelete = (id) => {
    if (!signedIn) {
      navigate("/signin");
    } else {
      const shouldDelete = window.confirm(
        "Da li ste sigurni da želite obrisati automobil?"
      );
      if (shouldDelete) {
        deleteCarById(id);
        getCars().then(({ data }) => updateCar(data));
      }
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          className="table table-striped table-hover"
          style={{ width: "300px", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th>Model</th>
              <th>Brand</th>
              <th>Year</th>
              <th>Max speed</th>
              <th>Automatic</th>
              <th>Engine</th>
              <th>No of doors</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Show</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(cars)
              ? cars.map((car, id) => (
                  <tr key={id}>
                    <td>{car.model}</td>
                    <td>{car.brand}</td>
                    <td>{car.year}</td>
                    <td>{car.maxSpeed}</td>
                    <td>{car.isAutomatic ? "Yes" : "No"}</td>
                    <td>{car.engine}</td>
                    <td>{car.numberOfDoors}</td>
                    <td>
                      <Link
                        className="btn btn-outline-warning"
                        to={`edit/${car.id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        type="delete"
                        onClick={() => handleDelete(car.id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link
                        className="btn btn-outline-success"
                        to={`/cars/${car.id}`}
                      >
                        Show
                      </Link>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ShowCars;