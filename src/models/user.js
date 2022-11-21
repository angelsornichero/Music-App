const pool = require('../database')
const bcrypt = require('bcryptjs')

module.exports = class User {
    insertUser = async (username, name, password, repeat_password, email) => {
        const userregistered = await this.findUserandPassword(username).then(data => {if (data[0]){return true}});
       // console.log(userregistered)
        if (password !== repeat_password || userregistered === true) {console.log(userregistered); return false}
        else {
        password = await bcrypt.hash(password, 8);
        pool.query(`INSERT INTO users(username, name, password, email) VALUES ('${username}', '${name}', '${password}', '${email}')`, 
            (err, results) =>{
                if (err) return false;
                if (results) return true
            })
            
        }
        
        return true 
    }
    findUserandPassword = (username) => {
        return new Promise( (resolve,reject) => {
            pool.query(`SELECT username, password from users WHERE username='${username}'`, (err, results) => {
              return (err) ? reject(err): resolve(Object.values(JSON.parse(JSON.stringify(results))));
            });
          });
        }
        
    matchPassword = (password, dbPassword) => {
        return bcrypt.compareSync(password, dbPassword);
    }

    findUser = (username) => {
        return new Promise( (resolve,reject) => {
            pool.query(`SELECT username from users WHERE username='${username}'`, (err, results) => {
              return (err) ? reject(err): resolve(Object.values(JSON.parse(JSON.stringify(results))));
            });
          });
        }
}




