import axios from 'axios'//importing this liaabry to make post requesy
import Noty from 'noty'//this is use to send notification
import {initAdmin} from './admin'
import moment from 'moment';//this will give the hh mm time format


 let addToCart=document.querySelectorAll('#add-to-cart');
let cartCounter = document.querySelector('#cartCounter')
let delBtn=document.querySelectorAll('.del-btn');
let updateBtn=document.querySelectorAll('.update-btn');

console.log(addToCart);
addToCart.forEach((btn)=>{
    btn.addEventListener('click',()=>{
        let cake=JSON.parse(btn.dataset.pizza);
        console.log(btn);

        updateCart(cake);
    })
})
function updateCart(cake) {
    axios.post('/update-cart', cake).then(res => {//this will make a post request on update-cart rout and now the compiler will jump on to web.js and calll the update cart controller and get back here with respoce
        cartCounter.innerText = res.data.totalQty
            console.log(res);
            new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        }).show();
    }).catch(err=>{
        console.log(err);
    })
};
let statuses=document.querySelectorAll('.status_line');
let hiddenInput=document.querySelector('#hiddenInput') ;
let order=hiddenInput? hiddenInput.value :null 
order=JSON.parse(order);
let time=document.createElement('small');
function updateStatus(order){
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')


    
    })
    let stepCompleted=true;

statuses.forEach((status) => {
    let dataProp=status.dataset.status;
    if(stepCompleted)
    {
        status.classList.add('step-completed')
    }
    if(dataProp === order.status)
    {
        stepCompleted=false;
        time.innerText=moment(order.updatedAt).format('hh:mm');
        status.appendChild(time);
        if(status.nextElementSibling){

            status.nextElementSibling.classList.add('current') //will return next element
        }
    }
});
}
updateStatus(order);
//socket client side 
//we have imported socekt .io in our layout file to access it on front end
let socket=io()  
initAdmin(socket)

//join customer with his o  rder id
if(order)
{

    socket.emit('join',`order_${order._id}`)
}

let adminAreaPath=window.location.pathname
console.log(adminAreaPath)
if(adminAreaPath.includes('admin')){
    console.log("in admin path");
    socket.emit('join','adminRoom')//creating eveent join for admin
}
socket.on('orderUpdated',(data)=>{

    const upadatedOrder={...order}//copying object by ...
    upadatedOrder.updatedAT=moment().format()
    upadatedOrder.status=data.status;
    updateStatus(upadatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order Updated',
        progressBar: false,
    }).show();
})
