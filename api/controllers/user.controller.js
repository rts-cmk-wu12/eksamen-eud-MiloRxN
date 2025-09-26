var { User, Listing, Request } = require("../models/models");
var { hashSync } = require("bcryptjs");

async function getSingleUser(req, res, next) {
  try {
    let user = await User.findByPk(parseInt(req.params.id), { include: [Listing, Request] });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

async function createSingleUser(req, res, next) {
  try {
    const existingUser = await User.findOne({ where: { email: req.fields.email}})
    if (existingUser) {
      return res.status(409).json({ error: "A user with this email already exists." });
    }

    let user = await User.create({
      email: req.fields.email,
      password: hashSync(req.fields.password, 15),
      firstname: req.fields.firstname,
      lastname: req.fields.lastname,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

async function updateSingleUser(req, res, next) {
  try {
    let user = await User.update({
      email: req.fields.email,
      password: hashSync(req.fields.password, 15),
      firstname: req.fields.firstname,
      lastname: req.fields.lastname,
    }, {
      where: {
        id: parseInt(req.params.id)
      },
      returning: true
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
}

module.exports = {
  createSingleUser,
  getSingleUser,
  updateSingleUser,
};
