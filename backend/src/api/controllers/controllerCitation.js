const getCitation = require("../models/modelCitation");

exports.listCitation = async (req, res) => {
  try {
    const getData = await getCitation.findById(req.params.post_id);
    res.status(201).json(getData);
  } catch (error) {
    console.log(error);
  }
};
