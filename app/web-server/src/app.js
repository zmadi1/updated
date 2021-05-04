let path = require('path')
const accountSid = 'AC87dfe7f2f6ac6c63ac33a6bef8aae64a'; 
const authToken = 'c9634aa1a0699c9d70aba5ab9f4f30a2'; 
const client = require('twilio')(accountSid, authToken);
// const botInsert = require( '../model');
 

// const app = express();
let port = process.env.PORT || 3000;

const hbs = require('hbs');
const mysql = require('mysql');


let pool = mysql.createPool({
    host: 'updated_db_1',
    port: 3306,
    user: 'root',
    password: 'nahman',
    database: 'zakhele'
});



//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')





let express = require('express');

let app = express();
//Setup handlebars engine and views locaion
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)); //we use this when 

let server = require('http').createServer(app)

let io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  })

//   User: Hello
//   Bot: How are you doing
//   how can I help you?
//   User: I want to check
//   my balance
//   Bot: You have R200
//   Bot: Anything else I can
//   help with?
//   User: No thanks
//   Bot: Awesome, happy
//   to assist goodbye.
app.get('/', (req, res) => { //we use this when we're handling dynamic html files
    
    // let str = req.query.Body;

    const count = () => {
            return new Promise((resolve, reject) => {
                pool.query(`SELECT COUNT(*) AS total_row FROM zakhele.users;`, (error, results, fields) => {
                    console.log(results)
                    if (error) reject(error);
                    resolve(results[0].total_row);
                });
            })
        }
    (async()=>{

        var total_row = await count();
        
        
        var name = 'User_'+total_row.toString();
        console.log(name);
    

    


        const insertUser = (data) => {
            return new Promise((resolve, reject) => {
                pool.query(`INSERT INTO zakhele.users (username,status,message) VALUES ('${name}',true,'${data}')`, (error, results, fields) => {
                    console.log(results)
                    if (error) reject(error);
                    resolve(results);
                });
            })
        }
        const insertBot = () => {
            return new Promise((resolve, reject) => {
                //INSERT INTO zakhele.bot (bot,username,message) VALUES ("bot",(SELECT `username` FROM zakhele.users WHERE `username`='user1'),"I was listening to amapiano here!!!!");
                pool.query(`INSERT INTO zakhele.bot (bot,username,message) VALUES ('Bot','${name}','Hello')`, (error, results, fields) => {
                    console.log(results)
                    if (error) reject(error);
                    resolve(results);
                });
            })
        }
   
    
        // console.log('Bot: How are you doing how can I help you?');
    io.on('connection', (socket) => {
        console.log('Client connected............')
    
        socket.on('join',(data)=>{
    
            console.log(data)
            socket.emit('captain','Hello My Name is Captain Bot............')
            socket.on("messages",(data)=>{
                if(data.toUpperCase().includes('HELLO')){

                    socket.emit('broad','Bot: How are you doing how can I help you?')
                    insertUser(data);
                    insertBot('How are you doing how can I help you?'); 
                    client.messages.create({
                        body: 'Hello! This is an editable text message. This is zakhele\'s Bot ......:).',
                        from: 'whatsapp:+14155238886',
                        to: 'whatsapp:+27839480771'
                    })
                    .then(message => console.log(message.sid)).done();
                }

                if(data.toUpperCase().includes("BALANCE")){
                    socket.emit('broad','Bot: You have R200');
                    socket.emit('broad','  Bot: Anything else I can help with?');
                    insertUser(data);
                    insertBot('Anything else I can help with?');
                }
            
                if(data.toLocaleUpperCase().includes('NO THANKS')){
                    socket.emit('broad','Bot: Awesome, happy to assist goodbye.')
                    insertUser(data);
                    insertBot('Awesome, happy to assist goodbye');
                }
    
                socket.broadcast.emit('broad',data)
    
            })
        })
    
    })
}

)()


     
    
    res.render('index', {
        title: 'Zakhele Bot',
        name: 'Zakhele Madi'
    })
})






// io.on('connection', (socket) => {

//     console.log('Client connected............')

//     socket.on('join',(data)=>{

//         console.log(data)
//         socket.emit('captain','Hello My Name is Captain Bot............')
//         socket.on("messages",(data)=>{
//             socket.emit('broad',data)

//             socket.broadcast.emit('broad',data)

//         })
//     })

// })



app.get('/about', async (req, res) => {
    try {
        let pool = mysql.createPool({
            host: 'updated_db_1',
            port: 3306,
            user: 'root',
            password: 'nahman',
            database: 'zakhele'
        });
        const query = () => {
            return new Promise((resolve, reject) => {
                pool.query("select * from zakhele.users", (error, results, fields) => {
                    console.log(results)
                    if (error) reject(error);
                    resolve(results[0]);
                });
            })
        }
        try {
            let {
                first_name,
                last_name,
                funniest_joke
            } = await query();
            res.render('about', {
                first_name: first_name,
                last_name: last_name,
                funniest_joke: funniest_joke,
                name: first_name
            });
        } catch (error) {
            console.log(error)
            res.render('about', {
                error: error
            });
        }
    } catch (error) {
        res.render('about', {
            first_name: error
        });
    }
});


/*
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Zakhele',
        errorMessage: 'Page not found'
    })
})
*/
server.listen(port, () => {
    console.log('Server is up on port ' + port);
})