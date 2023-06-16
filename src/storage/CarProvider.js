import { useState, useEffect } from "react";
import CarsContext from "./CarsContext";
import { addCar } from "../service/carService";
import { getCars } from "../service/carService";

const CarProvider = ({ children }) => {
  const [carState, setCarState] = useState([]);

  useEffect(() => {
    getCars().then(({ data }) => setCarState(data));
  }, []);

  const postNewCar = (car) => {
    const existingCar = carState.find((c) => c.brand === car.brand);
    if (existingCar) {
      return;
    }
    addCar(car).then(({ data }) => {
      setCarState((prevState) => [...prevState, data]);
    });
  };

  const carContext = {
    cars: carState,
    updateCar: setCarState,
    addCar: postNewCar,
  };
  return (
    <CarsContext.Provider value={carContext}>{children}</CarsContext.Provider>
  );
};

export default CarProvider;