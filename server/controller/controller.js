var Userdb = require('../model/model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "content cannot be empty" })
        return;
    }
    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status

    })
    user.
        save(user).then(data => {
            console.log(data)
            res.redirect('/add-user')
            //res.send(data)
          
        }).catch(err => {
            res.status(500).send({
                message: err.message || "some error occoured while some creates  operation"
            })
        })



}

//retreive and return all user /retriev and return single  user
exports.find = (req, res) => {
  

    Userdb.find()
        .then(user => {
             
            res.send(user)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error occoured when retreive user information"
            })

        })
    }



//update  a new identified user by id
exports.update = (req, res) => {
    const _id = req.params.id;
    console.log('req', _id)
    Userdb.findByIdAndUpdate(_id, req.body)
        .then(data => {
            console.log("req2"+data)
            if (!data) {
                res.status(404).send({ message: `cannot update the user by ${_id}, maybe user not found..!` })
            }
            else {
                res.status(200).send(data)
            }
        }).catch(err => {
            res.status(500).send({
                message: err.message || "error update user information"
            })
        })


}

//delete a particular user by its id
exports.delete = (req, res) => {
    const _id =req.params.id;
    Userdb.findByIdAndDelete(_id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot delete with id ${_id},may be id is wrong`})
        }else{
            res.send({
                message:'user deleted successfully'
            })
        }
    }).catch(err=>{
        res.status(500).send({
            message:`could not delete the user with this id ${_id}`
        })
    })


}