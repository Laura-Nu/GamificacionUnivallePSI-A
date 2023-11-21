import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as XLSX from 'xlsx';
import Rank from '../../Controllers/Rank';

function Create() {
  const [file, setFile] = useState(null);
  const [academicUnitOptions, setAcademicUnitOptions] = useState([]);
  const [careerOptions, setCareerOptions] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);

  useEffect(() => {
    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => setAcademicUnitOptions(data))
      .catch((error) => console.error('Error fetching academic unities: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => setCareerOptions(data))
      .catch((error) => console.error('Error fetching careers: ', error));
  }, []);

  const handleShowInfoModal = () => {
    setShowInfoModal(true);
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
    window.location.href = '/Students';
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const createAuditLog = (studentData) => {
    const data = JSON.parse(studentData.user);
    console.log(data);
    const auditData = {
      personId: data.PersonId, // ID del estudiante
      oldScore: 0,
      actualScore: data.Student.Score,
      oldRank: '',
      actualRank: data.Student.Rank,
      action: 'Create', // Acción de auditoría para la creación
      userID: JSON.parse(sessionStorage.userData).userId,
    };
    fetch('https://localhost:7103/api/StudentAudits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auditData),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Registro de auditoría creado con éxito');
        } else {
          console.error('Error al crear el registro de auditoría', response);
        }
      })
      .catch((error) => {
        console.error('Error al crear el registro de auditoría', error);
      });
  };

  const handleFileUpload = async (e) => {
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.onload = async (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheet = workbook.SheetNames[0];
      const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);

      for (const student of excelData) {
        try {
          const {
            Nombre,
            'Primer Apellido': lastName,
            'Segundo Apellido': secondLastName,
            Sede: academicUnityName,
            Carrera: careerName,
            'Numero de Estudiante': ci,
            Puntaje: score,
          } = student;

          const rankInstance = new Rank({ score });
          const { fullRank } = rankInstance.GetRank();

          const paddedCi = String(ci).padStart(7, '0');
          let emailPrefix = `${lastName.charAt(0)}`;

          if (secondLastName) {
            emailPrefix += secondLastName.charAt(0);
            emailPrefix += Nombre.charAt(0);
          } else {
            emailPrefix += Nombre.charAt(0);
          }

          const user = `${emailPrefix.toLowerCase()}${paddedCi}`;

          const academicUnity = academicUnitOptions.find(
            (option) => option.academicUnityName === academicUnityName
          );
          const academicUnityId = academicUnity ? academicUnity.academicUnityId : null;

          const career = careerOptions.find(
            (option) => option.careerName === careerName
          );
          const careerId = career ? career.careerId : null;

          const newStudent = {
            firstName: Nombre,
            lastName: lastName,
            secondLastName: secondLastName || ' ',
            academicUnityId: academicUnityId,
            careerId: careerId,
            email: user + '@est.univalle.edu',
            status: 1,
            role: 'Student',
            username: user,
            password: user,
            student: {
              rank: fullRank,
              score: score,
            },
          };

          console.log(newStudent);

          const response = await fetch('https://localhost:7103/api/User/create-user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newStudent),
          });

          if (response.ok) {
            const studentData = await response.json(); // Obtén los datos del estudiante, incluido personId
            console.log(studentData);
            createAuditLog(studentData);
            handleShowInfoModal();
          } else {
            console.error('Error al agregar el estudiante', await response.text());
          }
        } catch (error) {
          console.error('Error al procesar el estudiante', error);
        }
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="App bg-green">
      <h2 className='p-2 text-center font-weight-bold'>Cargar Estudiantes desde Excel</h2>
      <div className="App-header d-block">
        <div className='row mx-5 p-5'>
          <div className="form-group">
            <label htmlFor="file">Selecciona un archivo:</label>
            <input
              required
              type="file"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="btn btn-success mt-5 fs-3" onClick={handleFileUpload}>
            Añadir Estudiantes
          </button>
        </div>
      </div>

      <Modal show={showInfoModal} onHide={handleCloseInfoModal}>
        <Modal.Header closeButton>
          <Modal.Title>Información</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Estudiante creado con éxito.
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

export default Create;
