const Menu = require('./model');
function homeCon()
{
   return{
    async index(req,res){//because we have called index method in web.js thats why awe are able to acccess req and res here
        const pizzas=await Menu.find()//it will give all the pizza we have avauable in menu 

        return res.render('home',{pizzas:pizzas});//rendering home and sending menu
         
     }   


     
   } 
}
module.exports=homeCon;
