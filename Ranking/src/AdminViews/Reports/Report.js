import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../Styles/App.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Report() {
  const [people, setPeople] = useState([]);
  const [careers, setCareers] = useState({});
  const [academicUnities, setAcademicUnities] = useState({});

  useEffect(() => {
    fetch('https://localhost:7103/api/People')
      .then((response) => response.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setPeople(sortedData);
      })
      .catch((error) => console.error('Error fetching people: ', error));
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
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

  const getFilteredStudents = () => {
    return people.filter((person) => person.status === 1 && person.role === "Student");
  };

  const getFilteredAdmins = () => {
    return people.filter((person) => person.status === 1 && (person.role === "Admin" || person.role === "Master"));
  };

  const getFilteredTop10Bronze = () => {
    const filteredBronzeStudents = people.filter((person) => person.status === 1 && person.role === "Student" && ['Bronce I', 'Bronce II', 'Bronce III'].includes(person.student.rank));
    const sortedBronzeStudents = filteredBronzeStudents.sort((a, b) => b.student.score - a.student.score);
    return sortedBronzeStudents.slice(0, 10);
  };

  const getFilteredTop10Silver = () => {
    const filteredSilverStudents = people.filter((person) => person.status === 1 && person.role === "Student" && ['Plata I', 'Plata II', 'Plata III'].includes(person.student.rank));
    const sortedSilverStudents = filteredSilverStudents.sort((a, b) => b.student.score - a.student.score);
    return sortedSilverStudents.slice(0, 10);
  };

  const getFilteredTop10Gold = () => {
    const filteredGoldStudents = people.filter((person) => person.status === 1 && person.role === "Student" && ['Oro I', 'Oro II', 'Oro III'].includes(person.student.rank));
    const sortedGoldStudents = filteredGoldStudents.sort((a, b) => b.student.score - a.student.score);
    return sortedGoldStudents.slice(0, 10);
  };

  const getFilteredTop10Platinum = () => {
    const filteredPlatinumStudents = people.filter((person) => person.status === 1 && person.role === "Student" && ['Platino I', 'Platino II', 'Platino III'].includes(person.student.rank));
    const sortedPlatinumStudents = filteredPlatinumStudents.sort((a, b) => b.student.score - a.student.score);
    return sortedPlatinumStudents.slice(0, 10);
  };

  const getFilteredTop10Diamond = () => {
    const filteredDiamondStudents = people.filter((person) => person.status === 1 && person.role === "Student" && ['Diamante I', 'Diamante II', 'Diamante III'].includes(person.student.rank));
    const sortedDiamondStudents = filteredDiamondStudents.sort((a, b) => b.student.score - a.student.score);
    return sortedDiamondStudents.slice(0, 10);
  };

  const handleGenerateExcel = (data, fileName) => {
    const excelData = data.map((person) => {
      const name = (person.lastName || '') + (person.secondLastName ? ` ${person.secondLastName}` : '') + ', ' + (person.firstName || '');
      const row = {
        'Nombre Completo': name,
        'Carrera': careers[person.careerId] || '',
        'Sede': academicUnities[person.academicUnityId] || '',
        'Rango': '',
        'Puntaje': '',
      };

      if (person.role === "Student") {
        row['Rango'] = person.student && person.student.rank || '';
        row['Puntaje'] = person.student && person.student.score || '';
      } else if (person.role === "Admin" || person.role === "Master") {
        row['Expiración de sesión'] = person.expireDateAdmin || '';
        row['Rol'] = person.role;
      }

      return row;
    });

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Estudiantes');

    // Genera el archivo Excel
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const blobUrl = URL.createObjectURL(blob);

    // Crea un enlace invisible para descargar el archivo
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = fileName; // Nombre del archivo
    a.style.display = 'none';

    // Agrega el enlace al cuerpo del documento y simula un clic
    document.body.appendChild(a);
    a.click();

    // Limpia y elimina el enlace
    document.body.removeChild(a);
    URL.revokeObjectURL(blobUrl);
  };

  const handleGeneratePDF = (data, fileName) => {
    const pdfData = data.map((person) => {
      const row = [
        `${person.lastName} ${person.secondLastName}, ${person.firstName}`,
        careers[person.careerId],
        academicUnities[person.academicUnityId],
      ];

      if (person.role === "Student") {
        row.push(person.student && person.student.rank, person.student && person.student.score);
      } else if (person.role === "Admin" || person.role === "Master") {
        row.push(person.expireDateAdmin);
        row.push(person.role);
      }

      return row;
    });

    const columns = [
      { header: 'Nombre Completo', dataKey: 'name' },
      { header: 'Carrera', dataKey: 'career' },
      { header: 'Sede', dataKey: 'unity' },
    ];

    if (data[0] && data[0].role === "Student") {
      columns.push(
        { header: 'Rango', dataKey: 'rank' },
        { header: 'Puntaje', dataKey: 'score' }
      );
    } else if (data[0] && (data[0].role === "Admin" || data[0].role === "Master")) {
      columns.push({ header: 'Expiración de sesión', dataKey: 'expireDateAdmin' });
      columns.push({ header: 'Rol', dataKey: 'role' });
    }

    const doc = new jsPDF();
    doc.text('Reporte', 10, 10); // Agrega un título
    const headers = columns.map((column) => column.header);

    doc.autoTable({
      head: [headers], // Usar el array de encabezados
      body: pdfData,
      startY: 20, // Ajusta la posición de inicio del informe
    });

    // Genera el archivo PDF
    doc.save(fileName); // Nombre del archivo
  };

  const handleGenerateCombinedPDF = () => {
    const top10BronzeData = getFilteredTop10Bronze();
    const top10SilverData = getFilteredTop10Silver();
    const top10GoldData = getFilteredTop10Gold();
    const top10PlatinumData = getFilteredTop10Platinum();
    const top10DiamondData = getFilteredTop10Diamond();

    const pdfData = [
      { tableName: 'Top 10 Bronce', data: top10BronzeData },
      { tableName: 'Top 10 Plata', data: top10SilverData },
      { tableName: 'Top 10 Oro', data: top10GoldData },
      { tableName: 'Top 10 Platino', data: top10PlatinumData },
      { tableName: 'Top 10 Diamante', data: top10DiamondData },
    ];

    const doc = new jsPDF();

    pdfData.forEach((item, index) => {
      const data = item.data;
      const tableName = item.tableName;

      if (index > 0) {
        doc.addPage();
      }

      doc.text(tableName, 10, 10);

      const pdfData = data.map((person) => {
        const row = [
          `${person.lastName} ${person.secondLastName || ''}, ${person.firstName}`,
          careers[person.careerId] || '',
          academicUnities[person.academicUnityId] || '',
        ];

        if (person.role === "Student") {
          row.push(person.student && person.student.rank || '', person.student && person.student.score || '');
        } else if (person.role === "Admin") {
          row.push(person.expireDateAdmin || '', person.role);
        }

        return row;
      });

      const columns = [
        { header: 'Nombre Completo', dataKey: 'name' },
        { header: 'Carrera', dataKey: 'career' },
        { header: 'Sede', dataKey: 'unity' },
      ];

      if (data[0] && data[0].role === "Student") {
        columns.push(
          { header: 'Rango', dataKey: 'rank' },
          { header: 'Puntaje', dataKey: 'score' }
        );
      } else if (data[0] && data[0].role === "Admin") {
        columns.push({ header: 'Expiración de sesión', dataKey: 'expireDateAdmin' });
        columns.push({ header: 'Rol', dataKey: 'role' });
      }

      const headers = columns.map((column) => column.header);

      doc.autoTable({
        head: [headers],
        body: pdfData,
        startY: 20,
      });
    });

    doc.save('Top10Categorias.pdf');
  };

  const handleGenerateCombinedExcel = () => {
    const top10BronzeData = getFilteredTop10Bronze();
    const top10SilverData = getFilteredTop10Silver();
    const top10GoldData = getFilteredTop10Gold();
    const top10PlatinumData = getFilteredTop10Platinum();
    const top10DiamondData = getFilteredTop10Diamond();

    const spacerRow = { 'Nombre Completo': '', 'Carrera': '', 'Sede': '', 'Rango': '', 'Puntaje': '', };
    const combinedData = [...top10BronzeData, spacerRow, ...top10SilverData, spacerRow, ...top10GoldData,
      spacerRow, ...top10PlatinumData, spacerRow, ...top10DiamondData];
    handleGenerateExcel(combinedData, 'top10Categorias.xlsx');
  };

  return (
    <div className=''>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="font-weight-bold">Reportes</h1><br />
            <div className="button-container">
              <button className="btn btn-success d-inline" onClick={handleGenerateCombinedExcel}>
                Top 10 por Categoria Excel
              </button>
              <button className="btn btn-danger d-inline" onClick={handleGenerateCombinedPDF}>
                Top 10 por Categoria  PDF
              </button>
            </div><br />
            <div className="button-container">
              <button className="btn btn-success d-inline" onClick={() => handleGenerateExcel(getFilteredStudents(), 'estudiantes.xlsx')}>
                Total Alumnos Excel
              </button>
              <button className="btn btn-danger d-inline" onClick={() => handleGeneratePDF(getFilteredStudents(), 'estudiantes.pdf')}>
                Total Alumnos PDF
              </button>
            </div><br />
            <div className='button-container'>
              <button className="btn btn-success d-inline" onClick={() => handleGenerateExcel(getFilteredAdmins(), 'admins.xlsx')}>
                Total Administradores Excel
              </button>
              <button className="btn btn-danger d-inline" onClick={() => handleGeneratePDF(getFilteredAdmins(), 'admins.pdf')}>
                Total Administradores PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
