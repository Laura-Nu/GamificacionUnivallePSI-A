import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import info3 from '../../images/info_3.png';

function AddToStudent() {
  const { id } = useParams();
  const [sanctions, setSanctions] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [selectedSanction, setSelectedSanction] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Students';
  };

  useEffect(() => {
    fetch(`https://localhost:7103/api/People/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentName(`${data.lastName} ${data.secondLastName}, ${data.firstName}`);
      })
      .catch((error) => console.error('Error fetching data: ', error));

    fetch('https://localhost:7103/api/sanctions')
      .then((response) => response.json())
      .then((data) => {
        const filteredSanctions = data.filter((sanction) => sanction.status === 1 && sanction.type === "Sanction");
        setSanctions(filteredSanctions);
      })
      .catch((error) => console.error('Error fetching sanctions: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      sanctionId: selectedSanction,
      personId: id,
    };

    const response = await fetch('https://localhost:7103/api/StudentSanctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      handleShowInfoModal();
    } else {
      console.error('Error al agregar la sanción al estudiante', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className="mx-3 p-3 text-center">Añadir Sanción a Estudiante</h2>
      <div className="App-header d-block">
        <div className="row mx-5 p-5">
          <form className="col-md-5 mx-5" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="name"
                name="name"
                value={studentName}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="penaltyType">Sanción:</label>
              <select required
                className="form-select border-success border-3 rounded-4"
                id="penaltyType"
                name="penaltyType"
                value={selectedSanction}
                onChange={(e) => setSelectedSanction(e.target.value)}
              >
                <option value="">Selecciona una sanción</option>
                {sanctions.map((sanction) => (
                  <option key={sanction.sanctionId} value={sanction.sanctionId}>
                    {sanction.sanctionName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">
              Añadir Sanción
            </button>
          </form>

          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src={info3} alt="Imagen 1" className="img-fluid mx-5 image-width" />
          </div>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sanción agregada con éxito.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseInfoModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default AddToStudent;
