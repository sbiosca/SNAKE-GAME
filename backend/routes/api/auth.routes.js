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
    users = new auth(req.body);
    await users.save();
    res.send(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).send(false);
  }
});

router.put('/', async (req, res) => {
  try {
    let score = req.body.score;
    await auth.findByIdAndUpdate(req.body.id,  {score: score},
                            function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          //console.log("Updated User : ", docs);
      }
  });
  }catch (error) {
    //console.log(error);
    res.status(500).send("Hubo un error con update");
  }
});

module.exports = router;