var mysql = require('mysql');


var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'nahman',
    database: 'zakhele'
});




const botInsert = () => pool.query("INSERT INTO zakhele.users (username,status,message) VALUES (`user2`,false,We just checking)", result, function (err, result1) {
        if (err) throw err
        // console.log(`insert ${result.id} success`)
    })


const query = () => {
    return new Promise((resolve, reject) => {


        pool.query("select * from users", (error, results) => {
            if (error) reject(error);
            resolve(results);
        });
    })
}

// const getdata = async () => {
//     try {
//         console.log(await query())
//     } catch (error) {
//         console.log(error)
//     }
// }

// getdata()
module.exports = botInsert
module.exports = query