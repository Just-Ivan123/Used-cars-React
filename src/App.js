import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ShowCars from "./components/ShowCars";
import CarsContext from "./storage/CarsContext";
import { useContext, useEffect } from "react";
import { getCars } from "./service/carService";
import AddCar from "./components/AddCar";
import SignIn from "./register/SignIn";
import SignUp from "./register/SignUp";
import SingleCar from "./components/SingleCar";
function App() {
  const carContext = useContext(CarsContext);
  useEffect(() => {
    getCars().then((data) => carContext.updateCar(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/cars" />}></Route>
      <Route
        index
        path="/cars"
        element={<ShowCars cars={CarsContext} />}
      ></Route>
      <Route path="/add" element={<AddCar />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/cars/edit/:id" element={<AddCar />}></Route>
      <Route path="/cars/:id" element={<SingleCar />}></Route>
    </Routes>
  );
}

export default App;