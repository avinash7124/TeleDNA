const jsonfile = require('jsonfile');
const path = require('path');
const fs = require('fs');
const file = path.join(__dirname, '../storage/users.json');

var usersData = require(file);

module.exports = {
    users: usersData,
    addUser: add_User,
    findUser: check_User,
    updateUser: update_update
}


function add_User(userObject) {
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) throw err
        var arrayOfObjects = JSON.parse(data);
        arrayOfObjects.push(userObject);
        module.exports.users = arrayOfObjects;
        fs.writeFile(file, JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
            if (err) throw err
            return;
        })
    })
}

function check_User(id) {
    var d = [];
    module.exports.users.filter((obj, index) => {
        if (obj.id == id) {
            d.push([true, index, obj]);
        }
    })
    return d;
}

function update_update(userid,userObject, callback) {
    var keys = Object.keys(userObject);
    fs.readFile(file, 'utf-8', function (err, data) {
        if (err) callback(err, null)
        let arrayOfObjects = JSON.parse(data);
        let userdata = check_User(userid);
        keys.forEach((key) => {
            arrayOfObjects[userdata[0][1]].userdetails[key] = userObject[key];
        //    console.log(key + "  " + arrayOfObjects[userdata[0][1]].userdetails[key])
        });

        module.exports.users = arrayOfObjects;
        fs.writeFile(file, JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
            if (err) callback(err, null)
            //    callback(null, userObject);
            return;
        });
    });

}