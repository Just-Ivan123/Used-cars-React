import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCar,
  editCarById,
  getCarById,
  getCars,
} from "../service/carService";
import UserContext from "../storage/UserContext";

let years = [];

for (let i = 1990; i <= 2018; i++) {
  years.push(i);
}

const AddCar = () => {
  const { signedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!signedIn) {
      navigate("/signin");
    }
    if (id) {
      getCarById(id).then(({ data }) => {
        setCar(data);
        console.log(data);
      });
    }
  }, [id]);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    maxSpeed: 0,
    isAutomatic: false,
    engine: "",
    numberOfDoors: 0,
  });
  const [isAutomatic, setIsAutomatic] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCar((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleChecked = () => {
    setIsAutomatic(!isAutomatic);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(car);

    if (id) {
      editCarById(id, car);
    } else {
      addCar(
        car.brand,
        car.model,
        car.year,
        car.maxSpeed,
        car.numberOfDoors,
        isAutomatic,
        car.engine
      );
      setCar({
        brand: "",
        model: "",
        year: "",
        maxSpeed: 0,
        isAutomatic: isAutomatic,
        engine: "",
        numberOfDoors: 0,
      });
    }
    navigate("/");
  };
  return (
    <div>
      <form
        className="container mt-5"
        style={{ width: "300px" }}
        onSubmit={(event) => handleSubmit(event, car)}
      >
        <div className="form-floating mt-3">
          <input
            name="brand"
            value={car.brand}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="brand"
          />
          <label htmlFor="brand">Brand</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="model"
            value={car.model}
            type="text"
            className="form-control"
            onChange={handleInputChange}
            placeholder="model"
          />
          <label htmlFor="model">Model</label>
        </div>
        <div className="form-floating mt-3">
          <select
            className="form-control"
            name="year"
            onChange={handleInputChange}
            value={car.year}
          >
            <option disabled defaultValue value="">
              Select year:
            </option>
            {years.map((year, index) => {
              return (
                <option key={index} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <label htmlFor="year">Year</label>
        </div>
        <div className="form-floating mt-3">
          <input
            name="maxSpeed"
            value={car.maxSpeed}
            onChange={handleInputChange}
            type="number"
            className="form-control"
            placeholder="Max speed"
          />
          <label htmlFor="maxSpeed">Max Speed</label>
        </div>
        <div className="form-check mt-3">
          <input
            className="form-check-input"
            type="checkbox"
            checked={isAutomatic}
            onChange={handleChecked}
            name="isAutomatic"
            value={car.isAutomatic}
          />
          <label htmlFor="isAutomatic">Automatic</label>
        </div>
        <label htmlFor="engine">Engine:</label>
        <div>
          <div>
            <input
              type="radio"
              name="engine"
              value="diesel"
              id="diesel"
              onChange={handleInputChange}
            />
            <label htmlFor="diesel">Diesel</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="petrol"
              id="petrol"
              onChange={handleInputChange}
            />
            <label htmlFor="petrol">Petrol</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="electric"
              id="electric"
              onChange={handleInputChange}
            />
            <label htmlFor="electric">Electric</label>
          </div>
          <div>
            <input
              type="radio"
              name="engine"
              value="hybrid"
              id="hybrid"
              onChange={handleInputChange}
            />
            <label htmlFor="hybrid">Hybrid</label>
          </div>
        </div>
        <div className="form-floating mt-3">
          <input
            name="numberOfDoors"
            value={car.numberOfDoors}
            onChange={handleInputChange}
            type="number"
            className="form-control"
          />
          <label>Number of doors</label>
        </div>
        {id ? (
          <button
            className="w-100 btn btn-lg btn-warning mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Edit
          </button>
        ) : (
          <button
            className="w-100 btn btn-lg btn-success mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </button>
        )}
        <p className="mt-5 mb-3 text-body-secondary">
          &copy; Vivify academy 2023
        </p>
      </form>
    </div>
  );
};
export default AddCar;