const User=require('./customerModel');
const Order=require('./model');
var sameUser;
function customerDetails()
{
  return{
    
      async store(req,res){
          const {name,address,phone}=req.body;
          if(!phone || !address || !name)
          {
              req.flash('error','All Fields Are Required')//req.flash  is use to notify a message on frontend which can be accecs as messages.erroe
              res.redirect('/cart');
          }
          const user=new User({
              name:name,
              phone:phone,
              address:address
            })
            user.save().then(ress=>{
                sameUser=user;
                
                req.flash('success','User Store Successfully')

            }).catch(err =>{
                req.flash('error','something went wromg')
                console.log(err);
            })
            sameUser=user
            console.log("userrrrrrrrrr")
            console.log(sameUser)
  
            const order=new Order ({
                        customerREF:JSON.stringify (sameUser._id), 
                        items:req.session.cart.items, })



                       order.save().then(ress=>{
                req.flash('success','Order Placed Successfully')
                delete req.session.cart;//delting cart property from session so user cart can be null now
              
                const eventEmitter=req.app.get('eventEmitter');
                eventEmitter.emit('orderPlaced',{order:ress,user:sameUser})

                return res.redirect(`/singelOrder`);
                     
            }).catch(err =>{
                req.flash('error','something went wromg')
                console.log(err);
                return res.redirect('/cart')
            })

      },
    async  singelOrder(req,res)
      {
       console.log(req.session.user);
          const singelOrder=await Order.findOne({customerREF:JSON.stringify(sameUser._id)})
         
           return res.render('singelOrder',{order:singelOrder,user:sameUser});
        }
  }
}
module.exports=customerDetails;