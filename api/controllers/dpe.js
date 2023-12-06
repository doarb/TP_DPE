const config = require("../../config/index").config;
const dpeService = require("../../services/dpe");
const debug = require("debug")(config.name + ":api:dpe");

const getSearchDPE = async (req, res, next) => {
  debug("start getSearchDPES");

  let code_postal = req.body.code_postal || undefined;
  let DPE = req.body.DPE || undefined;
  let GES = req.body.GES || undefined;
  let Surface = req.body.Surface || undefined;
  let Date = req.body.Date || undefined;
  let dateDeDebut = req.body.dateDeDebut || undefined;
  let dateDeFin = req.body.dateDeFin || undefined;
  let user = req.user;

  let page = req.body.page || 1;
  let limit = req.body.limit || 10;
  try {
    let result = await dpeService.getSearchDPE(
      code_postal,
      DPE,
      GES,
      Surface,
      Date,
      dateDeDebut,
      dateDeFin,
      page,
      limit,
      user
    );
    debug("end getSearchDPES");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getSearchDPE,
};
