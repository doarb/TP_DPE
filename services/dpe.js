const dpe = require("../models/dpe");
const config = require("../config/index").config;
const debugUser = require("debug")(config.name + ":services:dpe");
const axios = require("axios");
const search = require("../models/search");

const getSearchDPE = async (
  Code_postal,
  DPE,
  GES,
  Surface,
  DateSearch,
  dateDeDebut,
  dateDeFin,
  page,
  limit,
  user
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
    query.Surface_habitable_logement = {
      $gte: Surface - 1,
      $lte: Surface + 1,
    };
  }
  if (DateSearch && DateSearch != undefined) {
    let dateParts = DateSearch.split("/");
    DateSearch = dateParts[2] + "-" + dateParts[1] + "-" + dateParts[0];
    query.$or = [
      {
        Date_réception_DPE: DateSearch,
      },
      {
        Date_établissement_DPE: DateSearch,
      },
      {
        Date_visite_diagnostiqueur: DateSearch,
      },
    ];
  }
  if (dateDeDebut && dateDeFin) {
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
  let options = {
    page: page,
    limit: limit,
  };
  try {
    let result = await dpe
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit);
    debugUser(result);
    let formattedResult = result.map((item) => item.dpeDisplay);
    debugUser(formattedResult);
    debugUser("end getSearchDPE");

    for (let i = 0; i < result.length; i++) {
      const address = result[i]["Adresse_(BAN)"];
      const encodedAddress = encodeURIComponent(address);

      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

      await axios
        .get(apiUrl)
        .then((response) => {
          // Traiter la réponse ici
          const resultGEO = response.data[0];
          formattedResult[i].latitude = resultGEO.lat;
          formattedResult[i].longitude = resultGEO.lon;
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la requête à Nominatim :",
            error.message
          );
        });
    }
    nbDoc = await search.find({}).countDocuments();
    idmax = 1;
    if (nbDoc > 0) {
      idmax = await search.find({}).sort({ id: -1 }).limit(1);
      idmax = idmax[0].id + 1;
    }

    let searchCreate = {
      id: idmax,
      user_id: user._id,
      parameters: {
        Code_postal: Code_postal,
        DPE: DPE,
        GES: GES,
        Surface: Surface,
        DateSearch: DateSearch,
        dateDeDebut: dateDeDebut,
        dateDeFin: dateDeFin,
      },
      result: formattedResult,
      date: new Date(),
    };
    try {
      await search.create(searchCreate);
    } catch (error) {
      throw error;
    }

    return formattedResult;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSearchDPE,
};
