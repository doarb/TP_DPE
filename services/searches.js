const config = require("../config/index").config;
const debugSearch = require("debug")(config.name + ":services:searches");
const axios = require("axios");
const search = require("../models/search");
const serviceDPE = require("../services/dpe");

const saveAll = async (user) => {
  debugSearch("start saveAll");

  try {
    let result = await search.find({ user_id: user._id });
    debugSearch("end saveAll");
    return result;
  } catch (error) {
    return error;
  }
};

const deleteSearch = async (user, id) => {
  debugSearch("start deleteAll");

  try {
    let result = await search.deleteOne({ user_id: user._id, id: id });
    debugSearch("end deleteAll");
    return result;
  } catch (error) {
    return error;
  }
};

const reloadSearch = async (user, id) => {
  debugSearch("start reloadSearch");

  try {
    let searchResquest = await search.findOne({ user_id: user._id, id: id });

    //récupére url corrant de l'application
    let url = config.urlAPI + "dpe/search";
    debugSearch("url " + url);
    //relance avec axios la requete dpe/search

    let requestBody = searchResquest.parameters;

    let Code_postal = requestBody.Code_postal || undefined;
    let DPE = requestBody.DPE || undefined;
    let GES = requestBody.GES || undefined;
    let Surface = requestBody.Surface || undefined;
    let DateSearch = requestBody.DateSearch || undefined;
    let dateDeDebut = requestBody.DateDeDebut || undefined;
    let dateDeFin = requestBody.DateDeFin || undefined;
    let page = requestBody.page || undefined;
    let limit = requestBody.limit || undefined;

    let result = await serviceDPE.getSearchDPE(
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
    );

    debugSearch("result " + result);
    let oldSearch = await search.deleteOne({ user_id: user._id, id: id });

    debugSearch("deleting old search " + oldSearch);
    debugSearch("end reloadSearch");
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  saveAll,
  deleteSearch,
  reloadSearch,
};
