import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';

function Update() {
  const { id } = useParams();
  const [sanction, setSanction] = useState({
    sanctionName: '',
    description: '',
    punctuation: 0,
  });

  useEffect(() => {
    fetch(`https://localhost:7103/api/Sanctions/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSanction(data);
      })
      .catch((error) => console.error('Error fetching data: ', error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedData = {
      sanctionId: id,
      sanctionName: sanction.sanctionName,
      description: sanction.description,
      punctuation: sanction.punctuation,
    };

    const response = await fetch(`https://localhost:7103/api/Sanctions/${updatedData.sanctionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      window.alert('Sanción actualizada con éxito');
      window.location.href = '/Sanction';
    } else {
      console.error('Error al actualizar la sanción', await response.text());
    }
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Actualizar Sanciones</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sanctionName">Nombre:</label>
              <input
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
              <input
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
              <input
                className="form-control border-success border-3 rounded-4"
                type="number"
                id="punctuation"
                name="punctuation"
                value={sanction.punctuation}
                onChange={(e) => setSanction({ ...sanction, punctuation: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Actualizar Sanción</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Update;
