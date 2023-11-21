import React, { useState, useEffect } from 'react';
import '../Styles/tables.css';

function Silver() {
  const [silverStudents, setSilverStudents] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => {
        const filteredSilverStudents = data.filter((student) => {
          return student.role === 'Student' && ['Plata I', 'Plata II', 'Plata III'].includes(student.student.rank);
        });
        const sortedData = filteredSilverStudents.sort((a, b) => parseInt(b.student.score) - parseInt(a.student.score));
        setSilverStudents(sortedData);
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
            <h2 className="font-weight-bold">Ranking Plata</h2>
            <div className="button-container">
              <a href="/Diamond" className="btn btn-diamond mb-3">Diamante</a>
              <a href="/Platinum" className="btn btn-platinum mb-3">Platino</a>
              <a href="/Gold" className="btn btn-gold mb-3">Oro</a>
              <a href="#" className="btn btn-silver mb-3">Plata</a>
              <a href="/Bronze" className="btn btn-bronze mb-3">Bronce</a>
            </div>
            <table className="table table-responsive text-center">
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
                {silverStudents.map((student) => (
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

export default Silver;
