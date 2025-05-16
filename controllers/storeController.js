const Favourite = require("../Models/favourite");
const Home = require("../Models/home");
const { ObjectId } = require('mongodb');
const User = require("../Models/User");

const getIndex = (req,res,next)=>{
    Home.find().then((registeredHomes) =>{
        res.render("store/home",{title : 'home --airbnb',registeredHomes:registeredHomes,isLoggedIn:req.session.isLoggedIn});
    })
}

const homeList = (req,res,next)=>{
    Home.find().then((registeredHomes) =>{
        res.render("store/home-list",{title : 'home-list --airbnb',registeredHomes:registeredHomes,isLoggedIn:req.session.isLoggedIn});
    })
}

const getHomeDetails = (req, res, next) => {
    const homeId = req.params.homeId;
    Home.findById(homeId).then(home => {
        if (!home) {
            return res.status(404).render('404', { title: 'Home Not Found' });
        }

        res.status(200).render('store/home-details', { title: 'Home Details --Airbnb', home: home ,isLoggedIn:req.session.isLoggedIn});
    });
};

const getBookings = (req,res,next) => {
    Home.find().then(registeredHomes=>{
        res.status(200).render('store/bookings',{title:'Home --Airbnb',registeredHomes:registeredHomes,isLoggedIn:req.session.isLoggedIn});
    });
}

const getFavList = async (req,res,next) => {
    const userId = req.session.user._id;
    const user =  await User.findById(userId).populate('favourites');
    Home.find().then(() =>{
        res.status(200).render('store/home-favourite',{
            title:'Fav-List --Airbnb',
            favHomes:user.favourites,
            isLoggedIn:req.session.isLoggedIn
        });
    });
}

const addTofovorites = async (req,res,next) => {
    const homeID = req.body.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);

    if(!user.favourites.includes(homeID)){
        user.favourites.push(homeID);
        await user.save();
    }
    res.redirect("/Fav-List");
}

const removeFav = async (req,res,next) =>{
    const homeId = req.params.homeId;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(user.favourites.includes(homeId)){
        user.favourites = user.favourites.filter(fav => fav != homeId);
        await user.save();
    }
    res.redirect("/Fav-List");
}

module.exports = {
    getIndex,
    homeList,
    getBookings,
    getFavList,
    getHomeDetails,
    addTofovorites,
    removeFav
};