let Household = require('../models/household')
let CompletedChores = require('../models/completedchore')
let Users = require('../models/user')

export default {
  household: {
    path: '/gethouseholds',
    reqType: 'get',
    method(req, res, next) {
        // debugger
      let action = 'Get Household Information'
      Household.find({ members: { $in: [req.session.uid] } })
        .then(household => {
        // //  debugger
        //   Household.find()
        //     .then(houses => {
        //      // debugger
        //       household.push(houses)
              res.send(handleResponse(action, household))
            // }).catch(error => {
            //   return next(handleResponse(action, null, error))
            //})
        }).catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  //   sharedhouseholds: {
  //   path: '/allhouseholds',
  //   reqType: 'get',
  //   method(req, res, next){
  //     Household.find({members: { $in: req.session.uid}})
  //       .then(households => {
  //         res.send(handleResponse(action, households))
  //       }).catch(error => {
  //         return next(handleResponse(action, null, error))
  //       })
  //   }
  // },
  findUsersByName: {
    path: '/findUsers',
    reqType: 'post',
    method(req, res, next) {
      let action = 'Find User and add them to the household members'
      Users.findOne({ name: req.body.user })
        .then(user => {
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
            // Might need more validation to check if user is creator of household for stupid users
            Household.findById(req.body.householdId)
              .then(household => {
                for (var i = 0; i < household.members.length; i++) {
                  var member = household.members[i];
                  if (member.email == user.email) {
                    res.send(handleResponse(action, "User is already part of the household"))
                    return;
                  }
                }
                if (true) {
                  household.members.push(user)
                  household.save(household).then(() => {
                    res.send(handleResponse(action, user))
                  })
                }
              })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  updateHouseholdMemberChore: {
    path: '/updateMemberChore',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update member completed chore list in active household'
      Household.findOne({ _id: req.body.householdId })
        .then(household => {
          for (var i = 0; i < household.members.length; i++) {
            let member = household.members[i];
            //
            if (member.email == req.body.chore.creatorEmail) {
              member.completedChores.push(req.body.chore)
              // household.members[i] = member
            }
          }
          household.save()
            .then(() => {
              res.send(handleResponse(action, household))
            })
        })

        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addCreatorToHousehold: {
    path: '/addCreator/:householdId',
    reqType: 'post',
    method(req, res, next) {

      let action = 'Add creator to newly created household'
      Users.findOne({ name: req.body.name })
        .then(user => {
          user.householdIds.push(req.params.householdId)
          user.save().then(() => {
            res.send(handleResponse(action, user))

          })
            .catch(error => {
              return next(handleResponse(action, null, error))
            })
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  addPointsToUser: {
    path: '/addPointsToUser',
    reqType: 'put',
    method(req, res, next) {
      //
      let action = 'Update user points'
      Users.findOne({ _id: req.body.user._id })
        .then(user => {
          //
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
            // debugger
            var householdId = req.body.chore.householdId
            var points = req.body.chore.points || 0
            var newPoints = Object.assign(user.points)
            newPoints[householdId] = user.points[householdId] ? user.points[householdId] + points : points
            Users.update({ _id: user._id }, { $set: { points: newPoints } }).then(() => {
              user.points = newPoints
              console.log('The User Points', user.points)
              res.send(handleResponse(action, user))
            })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  updateUserChore: {
    path: '/updateUserChore',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update user object'
      Users.findOne({ _id: req.body.userId })
        .then(user => {
          //
          if (!user) {
            res.sendStatus(404)({ error: "User Not Found" })
          } else {
            user.completedChores.push(req.body.chore)
            user.save(user).then(() => {
              res.send(handleResponse(action, req.body))
            })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  householdChores: {
    path: '/householdChores',
    reqType: 'put',
    method(req, res, next) {
      let action = 'Update household Chore Log array'
      Household.findOne({ _id: req.body.householdId })
        .then(household => {
          if (!household) {
            res.sendStatus(404)({ error: "Household Not Found" })
          } else {
            household.choreLog.push(req.body.chore)
            household.save(household).then(() => {
              res.send(handleResponse(action, req.body))
            })
              .catch(error => {
                return next(handleResponse(action, null, error))
              })
          }
        })
    }
  },
  getMember: {
    path: '/member/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get Member with Completed Chores'
      Users.findById(req.params.id).then(user => {
        CompletedChores.find({ userId: user.id }).then(chores => {
          user.completedChores = chores
          res.send(handleResponse(action, user))
        }).catch(err => handleResponse(action, null, err))
      }).catch(err => handleResponse(action, null, err))
    }
  },
  getMembersByHouseholdId: {
    path: 'households/:id/members',
    reqType: 'get',
    method(req, res, next) {

      let action = 'Get members by household Id'
      Users.find({ householdIds: { $in: [req.params.id] } }).then(users => {
        res.send(handleResponse(action, users))
      }).catch(err => handleResponse(action, null, err))
    }
  },
  getHouse: {
    path: '/house/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get household'
      Household.findById(req.params.id).then(house => {
        CompletedChores.find({ householdId: house._id }).then(chores => {
          house.completedChores = chores
          Users.find({ householdIds: { $in: [req.params.id] } }).then(members => {
            house.members = members
            house.save().then(() => {
              res.send(handleResponse(action, house))
            })
          })
        }).catch(err => handleResponse(action, null, err))
      }).catch(err => handleResponse(action, null, err))
    }
  },
  getHouseData: {
    path: '/housedata/:id',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get household'
      Household.findById(req.params.id).then(house => {
        res.send(handleResponse(action, house))
      }).catch(err => handleResponse(action, null, err))
    }
  },
  resetHousehold: {
    path: '/resetHousehold',
    reqType: 'post',
    method(req, res, next) {
      debugger
      let action = 'Delete Household'
      Household.findByIdAndRemove(req.body._id)
        .then(household => {
          debugger
          res.send(handleResponse(action, "household has been deleted"))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }

}
// router.post('/findUsers', (req, res) => {
//
//   Users.findOne({userName: req.body.user})
//     .then(user=>{
//       if(!user){
//         res.sendStatus(404)({error: "User Not Found"})
//       }else{
//         Household.findByIdAndUpdate
//       }
//     })
// })

function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}