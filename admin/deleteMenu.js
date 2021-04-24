const Menu=require('../home/model');
function deleteCake()
{
    return{
       async index(req,res){
       await Menu.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(!err){
                res.redirect('/menu');
            }
            else{
                console.log("can not delete data");
            }
        })
        },
    }
}
module.exports=deleteCake;