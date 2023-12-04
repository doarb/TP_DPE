const mongoose = require("mongoose");

const DPESchema = new mongoose.Schema({
  "N°_département_(BAN)": Number,
  Date_réception_DPE: String,
  Date_établissement_DPE: String,
  Date_visite_diagnostiqueur: String,
  Etiquette_GES: String,
  Etiquette_DPE: String,
  Année_construction: Number,
  Surface_habitable_logement: Number,
  "Adresse_(BAN)": String,
  "Code_postal_(BAN)": Number,
});

DPESchema.virtual("dpeDisplay").get(function () {
  return {
    "N°_département_(BAN)": this["N°_département_(BAN)"],
    "Adresse_(BAN)": this["Adresse_(BAN)"],
    Date_réception_DPE: this.Date_réception_DPE,
    Date_visite_diagnostiqueur: this.Date_visite_diagnostiqueur,
    Etiquette_GES: this.Etiquette_GES,
    Etiquette_DPE: this.Etiquette_DPE,
    Année_construction: this.Année_construction,
    Surface_habitable_logement: this.Surface_habitable_logement,
    latitude: null,
    longitude: null,
  };
});

module.exports = mongoose.model("depmini72", DPESchema);
