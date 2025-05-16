const Favourite = require("../Models/favourite");
const Home = require("../Models/home");
const fs = require("fs");
const path = require("path");
const routePath = require("../utils/pathUtils");

const getIndex = (req,res,next) => {
    Home.find().then((registeredHomes) =>{
        res.render('Admin/admin-home',{title:'Home --Airbnb',registeredHomes:registeredHomes,isLoggedIn:req.session.isLoggedIn});
    });
}

const getHomeList = (req,res,next) => {
    Home.find().then((registeredHomes) =>{
        res.render('Admin/home-list',{title:'HomeList Admin --Airbnb',registeredHomes:registeredHomes,isLoggedIn:req.session.isLoggedIn});
    });
}

const getAddHome = (req,res,next) => {
    title='addHome --airbnb';
    res.render('admin/editHome',{title:title,editing:false,isLoggedIn:req.session.isLoggedIn});
}

const getEditHome = (req,res,next) =>{
    const homeId = req.params.homeId;
    const editing = req.query.editing === 'true';

    Home.findById(homeId).then(home => {
        if(!home){
            console.log('Home Not Found For Editing');
            return res.redirect('/adminHomeList');
        }else{
            title = 'editHome --airbnb';
            res.render('admin/editHome',{title:title,editing:editing,home:home,isLoggedIn:req.session.isLoggedIn});
        }
    });
}

const postEditHome = async (req,res,next) =>{
    const {id,homeName,location,price,rating,description} = req.body;
    if(req.file){
        let hm;
        Home.findById(id).then((home)=>{
            hm = home.photo;
            const oldimagePath = path.join(routePath,hm);
            fs.unlink(oldimagePath,(err)=>{
                if(err){
                    console.log("Old image Not Found");
                }else{
                    console.log("Old image Deleted");
                }
            });
        });
    }
    Home.findById(id).then((home)=>{
        home.homeName = homeName;
        home.location = location;
        home.price = price;
        home.rating = rating;
        home.photo = !req.file ? home.photo : req.file.path;
        home.description = description;
        home.save().then().catch(err=>{
            console.log(err);
        })
    }).catch(err=>{
        console.log('Error While Finding Home : ',err);
    }).finally(()=>{
        res.redirect('/adminHomeList');
    });
}

const postAddHome = (req,res,next)=>{
    const {homeName,location,price,rating,description} = req.body;
    // console.log(req.body);
    // console.log(req.file);
    const photo = req.file.path;
    const home = new Home({homeName,price,location,rating,photo,description});
    home.save().then().catch(err=>{
        console.log(err);
    });
    res.redirect('/adminHomeList');
}

const postDeleteHome = (req,res,next) =>{
    const homeId = req.params.homeId;
    
    Home.findById(homeId).then((home)=>{
        hm = home.photo;
        const oldimagePath = path.join(routePath,hm);
        fs.unlink(oldimagePath,(err)=>{
            if(err){
                console.log("Image Not Found");
            }else{
                console.log("image Deleted");
            }
        });
    });

    Home.findByIdAndDelete(homeId).then(()=>{
        Favourite.findOneAndDelete({homeID : homeId}).then()
        .catch(err=>{
                console.log(err);
        })
    }).catch((error)=>{
        if(error){
            console.log('Error During Deleting ',error);
        }
    }).finally(()=>{
        res.redirect('/adminHomeList');
    });
}

module.exports = {
    getIndex,
    getHomeList,
    getAddHome,
    postAddHome,
    getEditHome,
    postEditHome,
    postDeleteHome
};