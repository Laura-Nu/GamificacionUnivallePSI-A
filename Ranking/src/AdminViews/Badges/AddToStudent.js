import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import info3 from '../../images/info_3.png';

function AddToStudent() {
  const { id } = useParams();
  const [studentName, setStudentName] = useState('');
  const [badges, setBadges] = useState([]);
  const [selectedBadge, setSelectedBadge] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/People/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setStudentName(`${data.lastName} ${data.secondLastName}, ${data.firstName}`);
      })
      .catch((error) => console.error('Error fetching student data: ', error));

    fetch('https://localhost:7103/api/badges')
      .then((response) => response.json())
      .then((data) => {
        const filteredBadges = data.filter((badge) => badge.status === 1);
        setBadges(filteredBadges);
      })
      .catch((error) => console.error('Error fetching badges: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Students';
  };

  const handleShowConflictModal = () => {
    setShowConflictModal(true);
  };

  const handleCloseConflictModal = () => {
    setShowConflictModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      badgeId: selectedBadge,
      personId: id,
    };

    const response = await fetch('https://localhost:7103/api/StudentBadges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      handleShowInfoModal();
    } else if (response.status === 409) {
      handleShowConflictModal();
    } else {
      console.error('Error al agregar el badge al estudiante', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className="mx-3 p-3 text-center">Añadir Badge a Estudiante</h2>
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
              <label htmlFor="badgeType">Badge:</label>
              <select required
                className="form-select border-success border-3 rounded-4"
                id="badgeType"
                name="badgeType"
                value={selectedBadge}
                onChange={(e) => setSelectedBadge(e.target.value)}
              >
                <option value="">Selecciona un badge</option>
                {badges.map((badge) => (
                  <option key={badge.badgeId} value={badge.badgeId}>
                    {badge.badgeName}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">
              Añadir Badge
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
        <Modal.Body>Insignia agregada al estudiante con éxito.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleCloseInfoModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showConflictModal} onHide={handleCloseConflictModal}>
        <Modal.Header closeButton>
          <Modal.Title>Error de Conflicto</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta insignia ya ha sido asignada a este estudiante.</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseConflictModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddToStudent;
