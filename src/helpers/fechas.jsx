


const diasEntreFechas = (fechaInicial,fechaFinal) => {

  // var fechaInicio = new Date('2022-04-20');
  // var fechaFin = new Date('2022-05-28');
  let fechaInicio = new Date(fechaInicial);
  // fechaInicio =fechaInicio.setDate(fechaInicio+1)
  let fechaFin = new Date(fechaFinal);
  let arrayFechas = [];

  
  while(fechaFin.getTime() >= fechaInicio.getTime()){
    fechaInicio.setDate(fechaInicio.getDate() + 1);

    arrayFechas.push(fechaInicio.getFullYear() + '/' + (fechaInicio.getMonth() + 1) + '/' + fechaInicio.getDate());
}

  return arrayFechas;
}

const getYears = ()=>{
  // const moonLanding = new Date('July 20, 69 00:20:18');
  return [new Date().getFullYear(), new Date().getFullYear()-1]
  
}




export {
  getYears,
  diasEntreFechas
}