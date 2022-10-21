var router = require("express").Router();

const auth = require("../../models/auth.model");

router.get('/', async (req, res) => {
    try {
      const users = await auth.find();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error");
    }
});

router.post('/', async (req, res) => {
  try {
    let users;
    users = new auth(req.body);;
    await users.save();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
})
// router.get('/login', async (req, res) => {
//   try {
//     //const users = await auth.find();
//     res.json(req.login);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Hubo un error");
//   }
// });


module.exports = router;