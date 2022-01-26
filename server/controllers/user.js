const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getNextSequenceValue = require("../models/counter")
const Session = require("../models/session")
const helpers = require("../helpers/helperFunctions");
const UserRoles = require("../models/userRoles")
const User = require("../models/user");
const userLogsModel = require("../models/userLogsModel");
exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          status: false,
          message: "A user with this email is already with us."
        });
      } else {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
              status: false
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              userId: await getNextSequenceValue.getNextSequenceValue("userId"),
              email: req.body.email,
              hashedPassword: hash,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              phone: req.body.phone,
              userName: req.body.userName,
            });
            user
              .save()
              .then(result => {
                let userRoleObject = {};
                userRoleObject.userRoleType = 2;
                userRoleObject._id = new mongoose.Types.ObjectId();
                userRoleObject.userId = result.userId;
                let userRoles = new UserRoles(userRoleObject)
                userRoles.save().then((result) => {
                  res.status(201).json({
                    status: true,
                    message: "User created"
                  });
                })

              })
              .catch(err => {
                console.log(err);
                res.status(500).json({
                  error: err,
                  status: false,
                });
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ userName: req.body.userName })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(200).json({
          message: "Invalid username/password.",
          token: "fail"
        });
      }
      else if (user[0].status === 0) {
        return res.status(200).json({
          message: "User has been blocked by administrator.",
          token: "fail"
        });
      }
      bcrypt.compare(req.body.password, user[0].hashedPassword, (err, result) => {
        if (err) {
          return res.status(200).json({
            message: "Invalid username/password..",
            token: "fail"
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              userName: user[0].userName,
              userId: user[0].userId,
              password: user[0].hashedPassword,
            },
            process.env.JWT_KEY || "secretsrc",
            {
              expiresIn: "5h"
            }
          );
          User.aggregate([
            { "$match": { "userName": req.body.userName } },
            { $unset: ["hashedPassword", "userName"] },
            {
              $lookup: {
                from: "userRoles", // collection name in db
                localField: "userId",
                foreignField: "userId",
                as: "userRole"
              }
            }]).exec(async function (err, user) {
              // students contain WorksnapsTimeEntries
              if (!err) {
                user[0]["token"] = token;
                user[0]["expiration"] = await helpers.getCurrentDate();
                user[0]["_id"] = new mongoose.Types.ObjectId();
                let session = new Session(user[0]);
                session.save().then((result) => {
                  return res.status(200).json({
                    message: "Authentication successful",
                    token: token,
                    user: user[0]
                  });
                })

              }
              else {

              }
            });

        }
        // res.status(200).json({
        //   message: "Invalid username/password..."
        // });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.user_update = (req, res, next) => {
  User.findOneAndUpdate({ userId: req.body.userId }, { $set: { status: req.body.status } })
    .exec()
    .then(result => {
      res.status(200).json({
        status: true,
        message: "User updated."
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        status: false,
        error: err
      });
    });
};

exports.get_users = (req, res, next) => {
  User.aggregate([
    { "$match": { "userId": { $ne: Number(req.headers.userid) } } },
    { $unset: ["hashedPassword"] },
    {
      $lookup: {
        from: "userRoles", // collection name in db
        localField: "userId",
        foreignField: "userId",
        as: "userRole"
      }
    }]).exec()
    .then(result => {
      res.status(200).json({
        status: true,
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        status: false,
        error: err
      });
    });
};


exports.view_logs = (req, res, next) => {
  userLogsModel.aggregate([
    { $match: { userId: { $ne: Number(req.headers.userid) } } },
    { $sort: { dateCreated: -1 } },
    { $unset: ["users.hashedPassword", "users.userName"] },
    { $lookup: { from: "userTodos", localField: "todoId", foreignField: "_id", as: "todo" } },
    { $lookup: { from: "users", localField: "userId", foreignField: "userId", as: "user" } },

  ])
    .exec()
    .then(result => {
      res.status(200).json({
        status: true,
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({
        status: false,
        error: err
      });
    });
};