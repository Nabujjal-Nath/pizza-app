const User=require('../../models/user')
const bcrypt=require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
function authController() {
    return {
        login(req,res) {
            res.render('auth/login.ejs');
        },
        postLogin(req,res,next){

            const {email,password } = req.body
            if(!email ||!password){
                req.flash('error','All fields are required')
                return res.redirect('/login')
            }

                 passport.authenticate('local',(err,user,info)=>{
                     if(err){
                         req.flash('error',info.message)
                         return next(err);
                     }
                     if(!user){
                        req.flash('error',info.message);
                        return res.redirect('/login');  
                     }
                     req.login(user,(err)=>{
                         if(err){
                             req.flash('error',info.message);
                             return next(err);
                         }
                         return res.redirect('/');
                     })
                 })(req,res,next)
        },
        logout(req,res){
            req.logout();
            return res.redirect('/login');
        },
        register(req,res){
            res.render('auth/register.ejs')
        },
        async postRegister(req,res){
          const {name,email,password } = req.body
          if(!name || !email ||!password){
              req.flash('error','All fields are required')
              req.flash('name',name);
              req.flash('email',email);
              return res.redirect('/register')
          }
          User.exists({email:email},(err,result)=>{
              if(result){
                req.flash('error','Email already taken')
                req.flash('name',name);
                req.flash('email',email);
                return res.redirect('/register')
              }
          })

          //hash password
          const hashedPassword= await bcrypt.hash(password,8);
          //create a user
          const user=new User({
              name,
              email,
              password:hashedPassword
          })
          user.save().then((user)=>{
           return res.redirect('/')
          }).catch(err=>{
              req.flash('error','Something went wrong');
              return res.redirect('/register')
          })


          console.log(req.body)
        }
    }
}

module.exports=authController;