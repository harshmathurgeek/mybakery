require('dotenv').config();
const express=require('express');
const app=express();
const path=require('path');
const ejs=require('ejs');
const mongoose=require('mongoose');
const expressLayout = require('express-ejs-layouts')
const session=require('express-session');
const flash = require('express-flash')//this liabary is use to notify its like sending notificaiion
const Emitter=require('events')
const MongoDbStore=require('connect-mongo')(session);
mongoose.connect(process.env.MONGO_CONNECTION_URL,{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("connected to database");
}).catch((err)=>{
console.log("errrrr "+err );
});

// session Store
let mongoStore=new MongoDbStore({
    mongooseConnection:connection,
    collection:'sessions',
});

//Event emitter
const eventEmitter = new Emitter() //setting up the event emiter 
app.set('eventEmitter',eventEmitter)

//session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store:mongoStore,
    saveUninitialized:false,
    cookie:{maxAge:1000*60*60*24}
}));
app.use(flash());//config flash to use notification feature

app.use(express.json());//so we can send output as json
app.use(express.static(path.join(__dirname, '/public')))
app.use(express.urlencoded({extended:false}));//so we can accces the form input values

// global middelware to get sessio+n variable on home.ejs
app.use((req,res,next)=>{
    res.locals.session=req.session//by req .session we will get the running  session
    res.locals.user=req.user
        next();//must to call to get next step of execution

})

app.use(expressLayout)//using ejs

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/resources/views'))//setting up all the frontend file'
require('./routes')(app);
const server=app.listen(80,()=>{
console.log("server started at 80");
})
//socket 
const io=require('socket.io')(server)
io.on('connection',(socket)=>{
    //join      
    socket.on('join',(orderId)=>{
        socket.join(orderId)
    })
})
     eventEmitter.on('orderUpdated',(data)=>{
        io.to(`order_${data.id}`).emit('orderUpdated',data)
        })
        //listing to event we have emited from ordercon.js{customer}
        eventEmitter.on('orderPlaced',(data)=>{
            io.to('adminRoom').emit('orderPlaced',data)
        })