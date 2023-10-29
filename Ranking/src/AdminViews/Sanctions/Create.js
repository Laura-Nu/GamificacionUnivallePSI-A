import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateSanction() {
  const [sanction, setSanction] = useState({
    sanctionName: '',
    description: '',
    punctuation: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('https://localhost:7103/api/Sanctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sanction),
    });

    if (response.ok) {
      window.alert('Sanción creada con éxito');
      window.location.href = '/Sanction';
    } else {
      console.error('Error al crear la sanción', await response.text());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSanction({
      ...sanction,
      [name]: value,
    });
  };

  return (
    <div className="App bg-green">
      <h2 className='mx-3 p-3'>Añadir Sanción</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <form className='col-md-5 mx-5' onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="sanctionName">Nombre:</label>
              <input
                type="text"
                id="sanctionName"
                name="sanctionName"
                value={sanction.sanctionName}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Descripción:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={sanction.description}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>
            <div className="form-group">
              <label htmlFor="punctuation">Puntuación:</label>
              <input
                type="number"
                id="punctuation"
                name="punctuation"
                value={sanction.punctuation}
                onChange={handleChange}
                className="form-control border-success border-3 rounded-4"
              />
            </div>

            <button type="submit" className="btn btn-success mt-5 fs-3">Añadir Sanción</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSanction;
