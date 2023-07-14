require("dotenv").config();

const {
  inquirerMenu,
  pausa,
  leerImput,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedad");

const main = async () => {
  const busquedas = new Busquedas();
  let opt;

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //Mostrar mensaje
        const termino = await leerImput("Ciudad: ");

        //Bucar Lugar
        const lugares = await busquedas.ciudad(termino);

        //Seleccionar el lugar
        const idSelc = await listarLugares(lugares);
        const lugarSel = lugares.find((l) => l.id === idSelc);
        
        //Clima

        const clima = await busquedas.climaLugar(lugarSel.lat, listarLugares.lon);
        console.log(clima);

        //Mostrar resultados
        console.log("  Informacionde la ciudad".yellow);
        console.log("Ciudad:", lugarSel.nombre);
        console.log("Lat:", lugarSel.lat);
        console.log("Lon:", lugarSel.lon);
        console.log("Temperatura:");
        console.log("Maxima:");
        console.log("Minima:");
        console.log("Como esdta el clima:");

        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
