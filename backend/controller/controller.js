const model = require("../models/model");

//post: http://localhost:8080/api/signup
async function create_user(req, res) {
  const Create = new model.Users({
    email: req.body.email,
    password: req.body.password,
  });
  let response = await model.Users.find({ email: req.body.email }).count();
  console.log(response);
  if (response === 0) {
    await Create.save().catch((err) => res.json(`Error : ${err}`));
    return res.status(201).json("User Created");
  } else return res.status(201).json("Email exists");
}
//post: http://localhost:8080/api/signin
async function get_user(req, res) {
  let email = req.body.email;
  let pass = req.body.password;
  let data = await model.Users.find({ email: email });
  if (data.length > 0) {
    if (data[0].password === pass) return res.status(201).json(data[0]._id);
  }
  return res.json({ _id: 0 });
}

async function create_Expenses(req, res) {
  const Create = await new model.Expenses({
    type: req.body.type,
    category: req.body.category,
    amount: req.body.amount,
    date: req.body.date,
    user: req.body.user,
  });
  await Create.save().catch((err) => res.json(`Error : ${err}`));
  return res.status(202).json("Transaction Created");
}


async function get_Expenses(req, res) {
  const userId = req.query.user;
  const data = await model.Expenses.find({ user: userId });
  return res.status(202).json(data);
}


async function delete_Expenses(req, res) {
  console.log();
  if (!req.body) return res.status(404).json({ error: "Body not Found" });
  await model.Expenses.deleteOne({ _id: req.body._id }, (err) => {
    if (!err) return res.json("Record Deleted");
  })
    .clone()
    .catch((err) => res.json(`Error while deleting ${err}`));
}

module.exports = {
  get_user,
  create_user,
  create_Expenses,
  get_Expenses,
  delete_Expenses,
};
