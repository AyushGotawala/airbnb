const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017/';

let _db;

const mongoConnect = (callback) =>{
    MongoClient.connect(url).then(client =>{
        _db = client.db('airbnb');
        callback();
    }).catch(error =>{
        console.log("Error While Connecting To Mongo ",error);
    })
}

const getDB = () =>{
    return _db;
}

module.exports = {
    getDB,
    mongoConnect
};
