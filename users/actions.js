const connection = require('../database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


createUserQuery = (name, surname, email, age, pass) => {
    const query = 'INSERT INTO users (Name, Surname, Email, Age, Password) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [name, surname, email, age, pass], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createUser = async (req, res, next) => {
    const userName = req.body.Name;
    const userSurname = req.body.Surname;
    const userEmail = req.body.Email;
    const userAge = req.body.Age;
    const userPassword = req.body.Password;
    try {
        const passHash = bcrypt.hashSync(userPassword, 10);
        const user = await createUserQuery(userName, userSurname, userEmail, userAge, passHash);
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getUserByEmailQuery = (email) => {
    const query = 'SELECT * FROM users WHERE Email = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

loginUser = async (req, res) => {
    const email = req.body.Email;
    const pass = req.body.Password;
    try {
        var user = await getUserByEmailQuery(email);
        var dbUser = user[0];
        const matchPass = bcrypt.compareSync(pass, dbUser.Password);
        if (matchPass) {
            const token = jwt.sign({ dbUser }, 'abcd', { expiresIn: '1y' });
            res.status(200).send(token);
        } else {
            res.status(401).send('wrong pass');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}; 

getAllUsersQuery = () => {
    const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersQuery();
        jwt.verify(req.token, 'abcd', (err, authData) =>{
            if(err){
                res.status(403).send('token not valid');
            } else {
                res.status(200).send(/*users*/authData);
            }
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateUserQuery = (id, user) => {
    const query = 'UPDATE users SET Name = ?, Surname = ?, Email = ?, Age = ?, Password = ? WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [user.Name, user.Surname, user.Email, user.Age, user.Password, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                // console.log(results);
                if (results.affectedRows == 0) {
                    reject('nema user so takvo Id')
                }
                resolve(results);  
            }
        });
    });
};

updateUser = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id;
    try {
        const users = await updateUserQuery(id, user);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

deleteUserQuery = (userId) => {
    const query = 'DELETE FROM users WHERE Id = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

deleteUser = async (req, res, next) => {
    var userId = req.params.id;
    try {
        const users = await deleteUserQuery(userId)
        res.status(200).send("Deleted user with id = " + userId);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createUser,
    loginUser, 
    getAllUsers,
    updateUser,
    deleteUser
};