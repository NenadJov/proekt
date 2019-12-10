const connection = require('../database');


createPortfolioQuery = (cash, createdOn, usersId) => {
    const query = 'INSERT INTO portfolio (cash, createdOn, usersId) VALUES (?, now(), ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [cash, createdOn, usersId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
};

createPortfolio = async (req, res, next) => {
    const portCash = req.body.Cash;
    const portCreatedOn = req.body.CreatedOn;
    const portUsersId = req.body.UsersId;
    try {
        const portfolio = await createUserQuery(portCash, portCreatedOn, portUsersId);
        res.status(200).send(portfolio);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getAllUsersQuery = () => {
    const query = 'select u.Id, u.Name, u.Surname, p.cash from users as u left join portfolio as p on u.id = p.UsersId';
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

updateBuyWithdrawCashQuery = (id, user) => {
    const query = 'update portfolio set cash = cash - ? where usersId = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [user.Cash, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results); 
            }
        });
    });
};

updateBuyWithdrawCash = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id;
    try {
        const users = await updateBuyWithdrawCashQuery(id, user);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateSellCashQuery = (id, user) => {
    const query = 'update portfolio set cash = cash + ? where usersId = ?';
    return new Promise((resolve, reject) => {
        connection.query(query, [user.Cash, id], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results); 
            }
        });
    });
};

updateSellCash = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id;
    try {
        const users = await updateSellCashQuery(id, user);
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    createPortfolio,
    getAllUsers,
    updateBuyWithdrawCash,
    updateSellCash
}