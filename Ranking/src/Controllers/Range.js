import React, { Component } from 'react';

// alt + shift + F:  ordenar
const rangos = {
  Bronce: {I: 0, II: 500, III: 1000,},
  Plata: {I: 1500, II: 2000, III: 2500,},
  Oro: {I: 3000, II: 3500, III: 4000,},
  Platino: {I: 4500, II: 5000, III: 5500,},
  Diamante: {I: 6000, II: 6500, III: 7000,},
};

class Estudiante extends Component {
  constructor(props) {
    super(props);
    this.state = {
      puntos: props.puntos,
    };
  }

  calcularRangoYSubrango = (puntos) => {
    let rangoActual = '';
    let subrangoActual = '';

    for (const rango in rangos) {
      for (const subrango in rangos[rango]) {
        const puntosRequeridos = rangos[rango][subrango];
        if (puntos >= puntosRequeridos) {
          rangoActual = rango;
          subrangoActual = subrango;
        } else {
          // Si los puntos no son suficientes para el subrango actual, sal del bucle
          break;
        }
      }
    }

    return { rangoActual, subrangoActual };
  };

  render() {
    const { rangoActual, subrangoActual } = this.calcularRangoYSubrango(
      this.state.puntos
    );

    return (
      <div>
        <h2>Estudiante</h2>
        <p>Puntos: {this.state.puntos}</p>
        <p>Rango: {rangoActual} {subrangoActual}</p>
      </div>
    );
  }
}

export default Estudiante;

