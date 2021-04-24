const Menu=require('../home/model');
function updateCake(){
    return{
       
        async index(req,res)
        {
           await Menu.findById(req.params.id,(err,doc)=>{
                if(!err)
                {
                    res.render('updatecake',{cake:doc})
                }
                else{
                    console.log("can not get data of this user");
                }
            })
        },
       async update(req,res)
       {
           await Menu.findByIdAndUpdate({_id:req.body._id},req.body,{new:true},(err,doc)=>{
            if(!err){

                res.redirect('/menu');
            }
            else{
                console.log("can not update data");
            }
    

       })
    }
}
}
module.exports=updateCake;