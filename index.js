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
               await busquedas.ciudad(termino);

               //Bucar Lugar
              

               //Seleccionar el lugar
          
               
               //Clima
              


               //Mostrar resultados
               console.log('  Informacionde la ciudad'.yellow);
               console.log('Ciudad:', );
               console.log('Lat:', );
               console.log('Lng:', );
               console.log('Temperatura:', );
               console.log('Maxima:', );
               console.log('Minima:', );
              
          break;
        
          
        }

        if( opt !== 0) await pausa();

   } while (opt !== 0);
}

main();