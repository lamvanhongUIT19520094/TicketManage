const {create, getById, getAll, update, deleteById} = require("../controller/city")
const router = require("express").Router();

router.post("/", create);

router.get("/:id", getById);

router.get("/", getAll);

router.put("/:id", update);

router.delete("/:id", deleteById);

module.exports = router;