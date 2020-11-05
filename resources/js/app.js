import axios from 'axios'
import Noty from 'noty'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza) {
   axios.post('/update-cart', pizza).then(res => {
       cartCounter.innerText = res.data.totalQty
       console.log('nabu')
        new Noty({
            type:'success',
            timeout:1000,
            progressBar:false,
            text:'Item added to cart'  
        }).show();
   }).catch(err => {
    new Noty({
        type:'error',
        timeout:1000,
        progressBar:false,
        text:'Item cannot be added!'  
    }).show();
   })
}

addToCart.forEach((btn) => {

   btn.addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
       let pizza = JSON.parse(btn.dataset.pizza)
       console.log('h1');
       updateCart(pizza)
   })
})




// import axios from 'axios'
// import Noty from 'noty'
// let addToCart=document.querySelectorAll('.add-to-cart');
// let cartCounter=document.querySelector('#cartCounter');

// function updateCart(pizza){
//       axios.post('/cart_update',pizza).then(res=>{
//           cartCounter.innerText=res.data.totalQty;
//           console.log('nabu!');    
//           new Noty({
//             type:"success",
//             timeout: 1000,
//             text: 'Item added to cart',
//             progressBar: false,
//             layout:'bottomLeft'
//         }).show();    
//       }).catch(err=>{
//         new Noty({
//             type:"error",
//             timeout: 1000,
//             text: 'Something went wrong',
//             progressBar: false,
//             layout:'bottomLeft'
//         }).show();
//       })
// }


// addToCart.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         let pizza = JSON.parse(btn.dataset.pizza)
//         updateCart(pizza);
        
//     })
// })