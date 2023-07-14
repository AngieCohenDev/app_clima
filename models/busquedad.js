const fs = require("fs");

const axios = require("axios");


class Busquedas {
  
  historial = [];
  dbPath = './db/database.json';

  constructor() {
    this.leerDb();
  }

  get paramsMapbox() {
    return {
      language: "es",
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
    };
  }

  get paramsWeather(){
    return{
      appid: process.env.OPENWEATHER_KEY,
      units: 'metric',
      lang: 'es',
      lat: '10.96854',
      lon: '-74.78132'
    }
  }

  async ciudad(lugar = "") {
    try {
      // Peticion http

      const intance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.paramsMapbox,
      });

      const resp = await intance.get();
      return resp.data.features.map( lugar =>({
        id: lugar.id,
        nombre: lugar.place_name,
        lat: lugar.center[0],
        lon: lugar.center[1],
      }))

    } catch (error) {
      console.log("No se encontro nada");
      return [];
    }
  }

  async climaLugar(){
    try {

      const intance =  axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather?`,
        params: this.paramsWeather
      })

      const resp = await intance.get();
      const {weather, main} = resp.data;

      return{
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp:main.temp,
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = ''){
    if(this.historial.includes(lugar.toLocaleLowerCase())){
      return;
    }
    this.historial.unshift(lugar)

    this.guardarDB();
  }

  guardarDB(){

    const payload = {
      historial: this.historial
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDb(){}

}
module.exports = Busquedas;
