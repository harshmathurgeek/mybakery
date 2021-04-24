const Menu=require('../home/model');
function addMenu()
{
    return {
        index(req,res)
        {
           return res.render('addMenu');
        },
        add(req,res)
        {
           const {name,image,price ,size}=req.body;
           if(!name || !price || !image || !size){
            req.flash('error','All Fields Are Required')//req.flash  is use to notify a message on frontend which can be accecs as messages.erro
            }
                const cake= new Menu({
                    name,
                    price,
                    image,
                    size,
                })
                cake.save().then(result=>{
            res.render('addMenu');

                }).catch(err=>{
                    console.log(err);
                })
        },
       async show(req,res){
            const cake=await Menu.find();
            res.render('menu',{pizzas:cake});
        }
    }

}
module.exports=addMenu