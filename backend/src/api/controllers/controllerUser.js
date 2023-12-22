const getUser = require("../models/modelUser");

exports.listuserid = async (req, res) => {
  try {
    const getdataUser = await getUser.findById(req.params.post_id);
    res.status(201).json(getdataUser);
  } catch (error) {
    console.log(error);
  }
};
