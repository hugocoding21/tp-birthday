module.exports = (server) => {
  const citController = require("../controllers/controllerCitation");
  const userController = require("../controllers/controllerUser");
  server.route("/citation/:post_id").get(citController.listCitation);

  server.route("/user/:post_id").get(userController.listuserid);
};
