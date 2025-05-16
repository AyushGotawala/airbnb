// const { ObjectId } = require('mongodb');

// module.exports = class Favourite {
//     constructor(homeID){
//         this.homeID = homeID;
//     }

//     save(){
//         const db = getDB();
//         return db.collection('favourites').findOne({homeID:this.homeID}).then(existingFav =>{
//             if(!existingFav){
//                 db.collection('favourites').insertOne(this);
//             }
//             return Promise.resolve();
//         })
//     }

//     static getFav(){
//         const db = getDB();
//         return db.collection('favourites').find().toArray();
//     }

//     static deleteById(delHomeId) {
//         const db = getDB();
//         return db.collection('favourites').deleteOne({ homeID: delHomeId });
//     }
// }

const mongoose = require('mongoose');

const favSchema = mongoose.Schema({
    homeID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'homes'
    }
});

module.exports = mongoose.model('Favourite', favSchema);