import { API } from "../shared/api";

export const getCars = () => {
  return API.get("/cars");
};

export const addCar = (
  brand,
  model,
  year,
  maxSpeed,
  numberOfDoors,
  isAutomatic,
  engine
) => {
  return API.post("/cars", {
    brand,
    model,
    year,
    maxSpeed,
    numberOfDoors,
    isAutomatic,
    engine,
  });
};

export const registerUser = (username, email, password) => {
  return API.post("/users", {
    realm: "PolovniAutomobili",
    username,
    email,
    password,
    emailVerified: true,
  });
};

export const logIn = (email, password) => {
  return API.post("/users/login", {
    email,
    password,
  });
};

export const getCarById = (id) => {
  return API.get(`/cars/${id}`);
};

export const editCarById = (id, car) => {
  return API.patch(`/cars/${id}`, car);
};

export const deleteCarById = (id) => {
  return API.delete(`/cars/${id}`);
};