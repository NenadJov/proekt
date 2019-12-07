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
            const token = jwt.sign({ dbUser }, 'abcd', { expiresIn: '1h' });
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
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createUser,
    loginUser, 
    getAllUsers
};