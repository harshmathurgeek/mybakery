const Admin=require('./model');
function adminCon()
{
    return {
        async store(req,res){
            // const admin=new Admin({
            //     name:"laxmann",
            //     username:"laxman@ckee",
            //     password:"laxmanjangid"
            // })
            // admin.save().then(res=>{
            //     console.log("you worth it");
            // }).catch(err=>{
            //     console.log(err);
            // })
            // 
            const data=await Admin.find();
            console.log(data);
            return res.send({data:data});
        },
        login(req,res){
            return res.render('login');
        },
       async check(req,res){
        const data=await Admin.find();
       
        if(req.body.username== data[0].username && req.body.password == data[0].password)
        {
            req.session.user='admin';
return res.redirect('/admin/orders');
        }
        else
        {
            return res.send("login failed");
             
        }
        }
           }
}
module.exports=adminCon;