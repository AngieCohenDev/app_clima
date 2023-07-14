const fs = require("fs");

const axios = require("axios");


class Busquedas {
  constructor() {}

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
      console.log(resp);

      return{
        desc: '',
        min: '',
        max: '',
        temp:'',
      }
      
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = Busquedas;
