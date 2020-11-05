const { json } = require("express")

function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }
            // for the first time creating cart and adding basic object structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // Check if item does not exist in cart 
            if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice =  cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController













// const { json } = require("express")
// function cartController() {
//     return {
//         index(req,res) {
//             res.render('customers/cart.ejs');
//         },
//         //for the first time creating cart and adding basic object structure
//         update(req,res){
//            if(!req.session.cart){
//                req.session.cart = {
//                    items:{},
//                    totalQuantity:0,
//                    totalPrice:0
//                } 
//            }
//            let cart=req.session.cart;//if cart is already created then store in cart
           
//            //check if item does not exist in cart
//            if(!cart.items[req.body._id])
//            {
//                cart.items[req.body._id]={
//                    item:req.body,
//                    qty:1,
//                }
//                cart.totalQuantity=cart.totalQuantity+1;
//                cart.totalPrice=cart.totalPrice+ req.body.price;

//            }else{
//                cart.items[req.body._id].qty= cart.items[req.body._id].qty+1;
//                cart.totalQuantity=cart.totalQuantity+1;
//                cart.totalPrice=cart.totalPrice+req.body.price;
//            }


//             return res.json({totalQuantity:req.session.cart.totalQuantity   });
//         }
//     }
// }

// module.exports=cartController;



