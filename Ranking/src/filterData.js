export const filterDataBySedeAndCarrera = (data, sede, carrera) => {
    return data.filter((item) => {
      return item.sede === sede && item.carrera === carrera;
    });
  };
  