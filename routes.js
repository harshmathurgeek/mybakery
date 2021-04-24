const homeCon=require('./home/homeCon');
const cartCon=require('./cart/cartCon');
const customerDetails=require('./order_feature/customerDetails');
const adminCon=require('./admin/adminCon');
const adminOrderCon=require('./admin/adminOrderCon');
const addMenu=require('./admin/addMenu');
const deleteMenu=require('./admin/deleteMenu');
const updateCake=require('./admin/updateCake');
const admin=require('./admin/adminConfig');
const statusCon=require('./admin/statusCon');
// const admin=require('./try');
function routes(app)
{
    app.get('/',homeCon().index)
    //users routes
    app.get('/cart',cartCon().index)
    app.post('/update-cart',cartCon().update);
    app.post('/customerDetails',customerDetails().store);
    app.get('/singelOrder',customerDetails().singelOrder);

    app.get('/login',adminCon().login)
    app.post('/login',adminCon().check)
    //admin routes
    app.get('/admin/orders',admin,adminOrderCon().index)
    app.get('/add-menu',admin,addMenu().index);
    app.post('/add-menu',admin,addMenu().add);
    app.get('/menu',admin,addMenu().show);
    app.get('/deletecake/:id',admin,deleteMenu().index);
    app.get('/updatecake/:id',admin,updateCake().index);
    app.post('/updatecake',admin,updateCake().update);
    app.get('/admin/orders',admin,adminOrderCon().index)
    app.post('/admin/orders/status',admin,statusCon().update);
   




}
module.exports=routes;