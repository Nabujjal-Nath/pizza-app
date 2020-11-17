const homeControl=require('../app/http/controllers/homeController');
const authControl=require('../app/http/controllers/authController');
const cartControl=require('../app/http/controllers/customers/cartController');

const guest =require('../app/http/middlewares/guest')

function initRoutes(app){
    app.get('/',homeControl().index);
    
    
    app.get('/login',guest,authControl().login);
    app.post('/login',authControl().postLogin);
    app.get('/register',guest,authControl().register);
    app.get('/cart',cartControl().index);
    app.post('/update-cart',cartControl().update);
    app.post('/register',authControl().postRegister);
    app.post('/logout',authControl().logout);
    
    }
    
    module.exports=initRoutes;