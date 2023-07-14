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
      console.log(resp.data);

      return [];
    } catch (error) {
      console.log("No se encontro nada");
      return [];
    }
  }
}
module.exports = Busquedas;
