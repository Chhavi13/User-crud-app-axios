

const axios = require('axios')
//make get request to /api/users


exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:2050/api/users')
        .then(function (response) {
            // console.log(response)
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })



}

exports.add_user = (req, res) => {
    res.render('add_user')
}

exports.update_user = (req, res) => {
    console.log(" req.query._id", req.query)
    axios.get('http://localhost:2050/api/users', { params: { id: req.query.id } })
        .then(function (userdata) {
            console.log("userData")
            console.log(userData)
            //  console.log("============="+userdata)
            // res.render('update_user',{user:userdata.data})
            // console.log("======="+user)

        }).catch(err => {
            res.send(err)
        })

}