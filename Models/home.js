const mongoose = require('mongoose');
/*
constructor(homeName,location,price,rating,photo,description){
        this.homeName = homeName;
        this.price = price;
        this.location = location;
        this.rating = rating;
        this.description = description;
        this.photo = photo;
    }

save() {
        const db = getDB();
        if(this._id){
            const Updated = {homeName : this.homeName,price : this.price,location : this.location,rating : this.rating,description:this.description,photo : this.photo};
            return db.collection('homes').updateOne({_id: new ObjectId(String(this._id))}, {$set : Updated});
        }else{
            return db.collection('homes').insertOne(this);
        }
    }

    static find(){
        const db = getDB();
        return db.collection('homes').find().toArray();
    }

    static findById(homeId){
        const db = getDB();
        return db.collection('homes').find({_id: new ObjectId(String(homeId))}).next();
    }

    static deleteById(homeId){
        const db = getDB();
        return db.collection('homes').deleteOne({_id: new ObjectId(String(homeId))});
    }
*/


const homeSchema = mongoose.Schema({
    homeName : {type : String,require : true},
    price : {type : Number,require : true},
    location : {type : String,require : true},
    rating : {type : Number,require : true},
    photo :  {type : String,require : true},
    description : {type : String,require : true}
}); 

module.exports = mongoose.model('Home',homeSchema);