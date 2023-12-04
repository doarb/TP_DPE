const users = require("../../models/dpe");
const config = require("../../config/index").config;
const dpeService = require("../../services/dpe");
const debug = require('debug')(config.name + ':api:dpe');

const getSearchDPE = async (req, res, next) => {
  debug('start getSearchDPES');
  let Code_postal = req.query.code_postal || undefined;
  let DPE = req.query.DPE || undefined;
  let GES = req.query.GES || undefined;
  let Surface = req.query.Surface || undefined;
  let Date = req.query.Date || undefined;
  let dateDeDebut = req.query.dateDeDebut || undefined;
  let dateDeFin = req.query.dateDeFin || undefined;

  let page = req.query.page || 1;
  let limit = req.query.limit || 10;
  try {
    let result = await dpeService.getSearchDPE(Code_postal, DPE, GES, Surface, Date, dateDeDebut, dateDeFin, page, limit);
    debug('end getSearchDPES');
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
    getSearchDPE
};
