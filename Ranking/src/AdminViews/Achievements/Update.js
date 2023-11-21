import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

function Update() {
  const { id } = useParams();
  const [sanction, setSanction] = useState({
    sanctionName: '',
    description: '',
    punctuation: 0,
    type: 'Achievement',
  });
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch(`https://localhost:7103/api/Sanctions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSanction(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    handleShowInfoModal();
    window.location.href = '/Achievements';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      sanctionId: id,
      sanctionName: sanction.sanctionName,
      description: sanction.description,
      punctuation: sanction.punctuation,
      type: sanction.type
    };

    const responseBeforeUpdate = await fetch(`https://localhost:7103/api/Sanctions/${id}`);
    const dataBeforeUpdate = await responseBeforeUpdate.json();

    const response = await fetch(`https://localhost:7103/api/Sanctions/${updatedData.sanctionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const responseAfterUpdate = await fetch(`https://localhost:7103/api/Sanctions/${id}`);
      const dataAfterUpdate = await responseAfterUpdate.json();

      const sanctionAuditData = {
        sanctionId: id,
        oldSanctionName: dataBeforeUpdate.sanctionName,
        actualSanctionName: dataAfterUpdate.sanctionName,
        oldDescription: dataBeforeUpdate.description,
        actualDescription: sanction.description,
        oldPunctuation: dataBeforeUpdate.punctuation,
        actualPunctuation: sanction.punctuation,
        action: 'Update',
        userID: JSON.parse(sessionStorage.userData).userId,
      };

      const responseAudit = await fetch('https://localhost:7103/api/SanctionAudits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanctionAuditData),
      });

      if (responseAudit.ok) {
        handleShowInfoModal();
      } else {
        console.error('Error al agregar SanctionAudit');
      }
    } else {
      console.error('Error al actualizar la sanción', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Actualizar Logros</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sanctionName">Nombre:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="sanctionName"
                name="sanctionName"
                value={sanction.sanctionName}
                onChange={(e) => setSanction({ ...sanction, sanctionName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="text"
                id="description"
                name="description"
                value={sanction.description}
                onChange={(e) => setSanction({ ...sanction, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="punctuation">Puntuación:</label>
              <input required
                className="form-control border-success border-3 rounded-4"
                type="number"
                id="punctuation"
                name="punctuation"
                value={sanction.punctuation}
                onChange={(e) => setSanction({ ...sanction, punctuation: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Logro</button>
          </form>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Logro actualizado con éxito.
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

export default Update;
