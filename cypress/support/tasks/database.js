// const { Pool } = require('pg')

// const dbConfig = {
//     host: '',
//     user: '',
//     password: '',
//     database: '',
//     port: 5432
// }

// module.exports = {
//     removeUser(email) {
//         const pool = new Pool(dbConfig)
//         return new Promise(function (resolve) {
//             pool.query('DELETE FROM users WHERE email = $1', [email], function (error, result) {
//                 if (error) {
//                     throw error
//                 }
//                 resolve({ success: result })
//             })
//         })
//     }
// }