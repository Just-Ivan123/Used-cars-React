import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CarsContext from "../storage/CarsContext";

function BrandModal({ selectedBrand, setSelectedBrand, filteredModels }) {
  const [show, setShow] = useState(false);
  const { cars } = useContext(CarsContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Search
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <select
            className="form-control"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option disabled defaultValue value="">
            Select brand
            </option>
            {Array.isArray(cars)
              ? cars.map((car) => (
                  <option key={car.id} value={car.brand}>
                    {car.brand}
                  </option>
                ))
              : null}
          </select>
          <div>
            <h5>Models:</h5>
            <ul>
              {Array.isArray(filteredModels)
                ? filteredModels.map((car) => <li key={car.id}>{car.model}</li>)
                : null}
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BrandModal;