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
    res.status(500).send("Hubo un error con el register");
  }
});

router.put('/', async (req, res) => {
  try {
    //let score;
    //score = new auth();
    //let user_id = "63516493a057ff1b0e1e4e1e"
    let score = req.body.score;
    await auth.findByIdAndUpdate(req.body.id,  {score: score},
                            function (err, docs) {
      if (err){
          console.log(err)
      }
      else{
          console.log("Updated User : ", docs);
      }
  });
    //await auth.findByIdAndUpdate(req.params.id, req.body);
    //await score.updateOne({score: score}) 
    //res.json(auth);
  }catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error con update");
  }
});

module.exports = router;