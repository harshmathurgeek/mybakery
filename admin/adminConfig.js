function adminConfig(req,res,next)
{
 if(req.session.user=='admin')
{
 return   next();

}
return res.redirect('/');
}
module.exports=adminConfig