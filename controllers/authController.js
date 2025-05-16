const { check, validationResult } = require("express-validator");
const User = require("../Models/User");
const bcrypt = require("bcryptjs");

const getLogin = (req,res,next) =>{
    res.render('auth/login',{
        title : 'SignUp --Airbnb',
        isLoggedIn:false,
        errorMessage: [],
        oldInput : {email:''}
    });
}

const getSignUp = (req,res,next) => {
    res.render('auth/SignUp',{title : 'SignUp --Airbnb',
        isLoggedIn:false,
        errorMessage : [],
        oldInput : {firstName:'',lastName:'',email:''}
    });
}

const getTerms = (req,res,next) =>{
    res.render('auth/terms',{title : 'Terms & Condition --Airbnb',isLoggedIn:false});
}

const postSignUp = [
    check("firstName")
    .trim()
    .notEmpty()
    .withMessage('First Name Is Required')
    .isLength({min:2})
    .withMessage('Last Name must be at least 2 Character long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('First Name Can Only Contain letter'),

    check("lastName")
    .trim()
    .notEmpty()
    .withMessage('Last Name Is Required')
    .isLength({min:2})
    .withMessage('Last Name must be at least 2 Character long')
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('Last Name Can Only Contain letter'),

    check("email")
    .isEmail()
    .withMessage('Please Enter Valid Email Address')
    .normalizeEmail(),

    check("password")
    .isLength({min:8})
    .withMessage("Password must be at least 8 character long")
    .matches(/[a-z]/)
    .withMessage("Password must contain atleast on lowercase character")
    .matches(/[A-Z]/)
    .withMessage("Password must contain atleast on Uppercase character")
    .matches(/[!@#$%^&*(),.?":{}|<>|]/)
    .withMessage("Password must contain atleast on Special case character")
    .trim(),

    check("confirmPassword")
    .trim()
    .custom((value,{req})=>{
        if(value !== req.body.password){
            throw new Error('Password Do not Match...');
        }
        return true;
    }),

    check("termsCheckbox")
        .custom((value) => {
        if (value !== 'on') {
        throw new Error('Please accept all terms & Conditions');
        }
        return true;
    }),

    (req,res,next) => {
        const {firstName,lastName,email,password,confirmPassword} = req.body;
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).render("auth/SignUp",{
                title:'SignUp --Airbnb',
                isLoggedIn:false,
                errorMessage: errors.array().map(error => error.msg),
                oldInput : {firstName,lastName,email,password,confirmPassword}
            });
        }

        bcrypt.hash(password,15).then(hashedPassword =>{
            const user = new User({firstName,lastName,email,password :hashedPassword });
            user.save().then().catch(err=>{
                res.status(422).render("auth/SignUp",{
                    title:'SignUp --Airbnb',
                    isLoggedIn:false,
                    errorMessage: [err.message],
                    oldInput : {firstName,lastName,email}
                });
            })
            res.redirect('/Login');
        }).catch(err =>{
            res.status(422).render("auth/SignUp",{
                title:'SignUp --Airbnb',
                isLoggedIn:false,
                errorMessage: [err.message],
                oldInput : {firstName,lastName,email}
            });
        })
    }];

const postLogin = async (req,res,next) => {
    const {email,password} = req.body;
    const user = await User.findOne({email : email});

    if(!user){
        return res.status(422).render("auth/Login",{
            title:'SignUp --Airbnb',
            isLoggedIn:false,
            errorMessage: ['Invaild Cardentiles'],
            oldInput : {email}
        });
    }

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        return res.status(422).render("auth/Login",{
            title:'SignUp --Airbnb',
            isLoggedIn:false,
            errorMessage: ['Invaild Cardentiles'],
            oldInput : {email}
        });
    }

    req.session.isLoggedIn = true;
    req.session.user = user;
    res.redirect('/');
}

const postLogout = (req,res,next) =>{
    // res.clearCookie("isLoggedIn");
    req.session.destroy(()=>{
        res.redirect('/');
    })
}

module.exports = {
    getLogin,
    postLogin,
    postLogout,
    getSignUp,
    postSignUp,
    getTerms
}