const LocalStrategy=require('passport-local').Strategy
const User=require('../models/user')
const bcrypt= require('bcrypt')
const user = require('../models/user')
function init(passport){
    passport.use(new LocalStrategy({usernameField:'email'}, async(email,password,done)=>{
        //Login
        //check if email exists
        const user=await User.findOne({email:email})
        if(!user){
            return done(null,false,{message:'No user with wthis mail'})
        }

        bcrypt.compare(password,user.password).then(match=>{
            if(match){
                return done(null,user,{message:'Logged in successfully'})
            }
           return done(null,false,{message:'Wrong username or password'})
        }).catch(err=>{
            return done(null,false,{message:'something went wromg'})
        })
    }))

    passport.serializeUser((user,done)=>{  // storing id of user in session
        done(null,user._id)
    })

    passport.deserializeUser((id,done)=>{    //retreiving the user info with id
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })

}
module.exports=init