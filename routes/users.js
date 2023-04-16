const router = require("express").Router();
const app = require("../controllers/users");

router.get("/", app.all);

router.post("/", app.add);

router.route("/:id").get(app.get).patch(app.patch).delete(app.drop);

module.exports = router;
