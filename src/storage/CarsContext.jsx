import { createContext } from "react";

const CarsContext = createContext({
  cars: [],
  updateCar: () => {},
  addCar: () => {},
});

export default CarsContext;