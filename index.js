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
               if (idSelc === '0') continue;
               const lugarSel = lugares.find((l) => l.id === idSelc);

               // Guardar en DB
               busquedas.agregarHistorial(lugarSel.nombre)
               

               //Clima
               const clima = await busquedas.climaLugar(lugarSel.lat, listarLugares.lon);
          

               //Mostrar resultados
               console.clear();
               console.log("  Informacionde la ciudad".yellow);
               console.log("Ciudad:", lugarSel.nombre.green);
               console.log("Lat:", lugarSel.lat);
               console.log("Lon:", lugarSel.lon);
               console.log("Temperatura:", clima.temp);
               console.log("Maxima:", clima.max);
               console.log("Minima:", clima.min);
               console.log("Como esta el clima:", clima.desc);

          break;

          case 2:
               busquedas.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i + 0}.`.green
                    console.log((`${idx} ${lugar}`));
               })
          break  
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
