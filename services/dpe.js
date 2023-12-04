const dpe = require("../models/dpe");
const config = require("../config/index").config;
const debugUser = require("debug")(config.name + ":services:dpe");
const axios = require("axios");
const getSearchDPE = async (
  Code_postal,
  DPE,
  GES,
  Surface,
  Date,
  dateDeDebut,
  dateDeFin,
  page,
  limit
) => {
  debugUser("start getSearchDPE");
  let query = {};
  if (Code_postal && Code_postal != undefined) {
    query["Code_postal_(BAN)"] = Code_postal;
  }
  if (DPE && DPE != undefined) {
    query.Etiquette_DPE = DPE;
  }
  if (GES && GES != undefined) {
    query.Etiquette_GES = GES;
  }
  if (Surface && Surface != undefined) {
    //around à la valeur précise par exemple 100.2m2 autour de 100m2
    query.Surface_habitable_logement = {
      $gte: Surface - 0.5,
      $lte: Surface + 0.5,
    };
  }
  if (Date && Date != undefined) {
    query.$or = [
      {
        Date_réception_DPE: Date,
      },
      {
        Date_établissement_DPE: Date,
      },
      {
        Date_visite_diagnostiqueur: Date,
      },
    ];
  }
  if (dateDeDebut && dateDeFin) {
    //fais moi la recherche entre les differnetes dates pour les colonnes Date_réception_DPE et Date_établissement_DPE et Date_visite_diagnostiqueur avec un or
    query.$or = [
      {
        Date_réception_DPE: {
          $gte: dateDeDebut,
          $lte: dateDeFin,
        },
      },
      {
        Date_établissement_DPE: {
          $gte: dateDeDebut,
          $lte: dateDeFin,
        },
      },
      {
        Date_visite_diagnostiqueur: {
          $gte: dateDeDebut,
          $lte: dateDeFin,
        },
      },
    ];
  }
  debugUser(query);
  let options = {
    page: page,
    limit: limit,
  };
  try {
    let result = await dpe.paginate(query, options);
    debugUser("end getSearchDPE");
    return result;
  } catch (error) {
    throw error;
  }
};
