const config = require("../../config/index").config;
const searchesService = require("../../services/searches");
const debug = require("debug")(config.name + ":api:searches");

//fais moi le commentaire

const saveAll = async (req, res, next) => {
  debug("start saveAll");
  let user = req.user;
  try {
    let result = await searchesService.saveAll(user);
    debug("end saveAll");
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


const deleteSearch = (req, res) => {
  debug("start deleteSearch");
  let user = req.user;
  let id = req.params.id || -1;
  searchesService
    .deleteSearch(user, id)
    .then((result) => {
      debug("end deleteSearch");
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
};

const reload = (req, res) => {
  debug("start reload");
  let user = req.user;
  let id = req.params.id || -1;
  searchesService
    .reloadSearch(user, id)
    .then((result) => {
      debug("end reload");
      return res.status(200).json(result);
    })
    .catch((error) => {
      return res.status(400).json({ message: error.message });
    });
};

module.exports = {
  saveAll,
  deleteSearch,
  reload,
};
