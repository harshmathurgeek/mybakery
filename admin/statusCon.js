const Order=require('../order_feature/model');

function statusCon(){

    return {
   async   update(req,res){
      const data= await Order.updateOne({_id:req.body.orderId},{status:req.body.status})
      const eventEmitter=req.app.get('eventEmitter');
      eventEmitter.emit('orderUpdated',{id:req.body.orderId,status:req.body.status})
          return res.redirect(`/admin/orders`)
        }


      }
         
      
        }
module.exports=statusCon