import React, { useState, useEffect } from 'react';
import '../Styles/tables.css';

function Platinum() {
  const [platinumStudents, setPlatinumStudents] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => {
        const filteredPlatinumStudents = data.filter((student) => {
          return student.role === 'Student' && ['Platino I', 'Platino II', 'Platino III'].includes(student.student.rank);
        });
        const sortedData = filteredPlatinumStudents.sort((a, b) => parseInt(b.student.score) - parseInt(a.student.score));
        setPlatinumStudents(sortedData);
      })
      .catch((error) => console.error('Error fetching students: ', error));

    fetch('https://localhost:7103/api/Careers')
      .then((response) => response.json())
      .then((data) => {
        const careerMap = {};
        data.forEach((career) => {
          careerMap[career.careerId] = career.careerName;
        });
        setCareers(careerMap);
      })
      .catch((error) => console.error('Error fetching careers: ', error));

    fetch('https://localhost:7103/api/AcademicUnities')
      .then((response) => response.json())
      .then((data) => {
        const academicUnityMap = {};
        data.forEach((academicUnity) => {
          academicUnityMap[academicUnity.academicUnityId] = academicUnity.academicUnityName;
        });
        setAcademicUnities(academicUnityMap);
      })
      .catch((error) => console.error('Error fetching academic unities: ', error));
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="font-weight-bold">Ranking Platino</h2>
            <div className="button-container">
              <a href="/Diamond" className="btn btn-diamond mb-3">Diamante</a>
              <a href="#" className="btn btn-platinum mb-3">Platino</a>
              <a href="/Gold" className="btn btn-gold mb-3">Oro</a>
              <a href="/Silver" className="btn btn-silver mb-3">Plata</a>
              <a href="/Bronze" className="btn btn-bronze mb-3">Bronce</a>
            </div>
            <table className="table table-responsive text-center mx-5">
              <thead>
                <tr>
                  <th>Nombre Completo</th>
                  <th>Rango</th>
                  <th>Puntaje</th>
                  <th>Carrera</th>
                  <th>Sede</th>
                </tr>
              </thead>
              <tbody>
                {platinumStudents.map((student) => (
                  <tr key={student.personId}>
                    <td>{student.lastName} {student.secondLastName}, {student.firstName}</td>
                    <td>{student.student && student.student.rank}</td>
                    <td>{student.student && student.student.score}</td>
                    <td>{careers[student.careerId]}</td>
                    <td>{academicUnities[student.academicUnityId]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Platinum;
