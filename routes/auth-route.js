const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/check-auth");

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, message: "Hash Error!" });
    } else {
      const user = new User({
        displayName: req.body.displayName,
        email: req.body.email,
        password: hash,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        state: req.body.state,
        postalCode: req.body.postalCode
      });

      user
        .save()
        .then((_) => {
          res.json({ success: true, message: "Acoount created" });
        })

        .catch((err) => {
          if (err.code === 11000) {
            return res.json({
              success: false,
              message: "E-mail is already exist",
            });
          }
          res.json({ success: false, message: "Authentication failed" });
        });
    }
  });
});

router.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec()
    .then((result) => {
      if (result.length < 1) {
        return res.json({ success: false, message: "User not found" });
      }
      const user = result[0];
      bcrypt.compare(req.body.password, user.password, (err, ret) => {
        if (ret) {
          const payload = {
            userId: user._id,
          };
          const token = jwt.sign(payload, "webBatch");
          return res.json({
            success: true,
            token: token,
            message: "Login Successful",
          });
        } else {
          return res.json({
            success: false,
            message: "Password does not Match",
          });
        }
      });
    })
    .catch((err) => {
      res.json({ success: false, message: "Authentication failed" });
    });
});

router.get("/profile", checkAuth, (req, res) => {
  const userId = req.userData.userId;
  User.findById(userId)
    .exec()
    .then((result) => {
      res.json({ success: true, data: result });
    })
    .catch((err) => {
      res.json({ success: false, message: "Server Error" });
    });
});


router.put('/address', async (req, res) => {
  const { userId } = req.params;
  const { addressLine1, city, state, postalCode } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.address.addressLine1 = addressLine1;
    user.address.city = city;
    user.address.state = state;
    user.address.postalCode = postalCode;

    await user.save();

    res.json({ success: true, message: 'Address updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
