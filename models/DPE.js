const mongoose = require('mongoose');

const DPESchema = new mongoose.Schema({
    "N°_département_(BAN)": Number,
    Date_réception_DPE: Date,
    Date_établissement_DPE: Date,
    Date_visite_diagnostiqueur: Date,
    Etiquette_GES: String,
    Etiquette_DPE: String,
    Année_construction: Number,
    Surface_habitable_logement: Number,
    "Adresse_(BAN)": String,
    "Code_postal_(BAN)": Number
});

module.exports = mongoose.model('depmini72', DPESchema);