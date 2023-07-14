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
        lng: lugar.center[0],
        lat: lugar.center[1],
      }))

      
    } catch (error) {
      console.log("No se encontro nada");
      return [];
    }
  }
}
module.exports = Busquedas;
