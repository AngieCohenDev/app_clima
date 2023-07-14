require('dotenv').config()

const {  inquirerMenu, pausa, leerImput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require('./models/busquedad');





const main = async() =>{
     const busquedas = new Busquedas();
    let opt;

   do {
    
        opt = await inquirerMenu();
        
        switch (opt) {
          case 1:
               //Mostrar mensaje
               const termino = await leerImput('Ciudad: ');

               //Bucar Lugar
               const lugares= await busquedas.ciudad(termino);

               //Seleccionar el lugar
               const id = await listarLugares(lugares)
               if ( id === '0' ) continue;
               const lugarSel = lugares.find(l => l.id === id);
               
               //Clima
               //const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);


               //Mostrar resultados
               console.log('  Informacionde la ciudad'.magenta);
               console.log('Ciudad:', lugarSel.nombre);
               console.log('Lat:', lugarSel.lat);
               console.log('Lng:', lugarSel.lng);
              
          break;
        
          
        }

        if( opt !== 0) await pausa();

   } while (opt !== 0);
}

main();