const Orders=require('../order_feature/model');
const User=require('../order_feature/customerModel');
const moment=require('moment');//a package which will give human redable time

function adminOrderCon()
{
   return{

      async index(req, res) {
         const order=await Orders.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }})
              //it will return all the order jo complete nhi hue h means jinka status compete ko chode ke kuch bhi ho
        const user=[];
      for (let index = 0; index < order.length; index++) {
           const element = order[index];
           user[index]=await User.findOne({_id:JSON.parse(element.customerREF)})

           
        }

              if(req.xhr) {
           return  res.status(200).send({
              order,
              user
           });

             } else {


              return res.render('adminOrder')
             }
      
      },

  
     
   } 
}
module.exports=adminOrderCon;