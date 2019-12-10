const connection = require('../database');


createPortfolioQuery = (cash, /*createdOn,*/ usersId) => {
    const query = 'INSERT INTO portfolio (cash, createdOn, usersId) VALUES (?, now(), ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [cash, /*createdOn,*/ usersId], (error, results, fields) => {
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
    // const portCreatedOn = req.body.CreatedOn;
    const portUsersId = req.params.Id;
    try {
        const portfolio = await createUserQuery(portCash, /*portCreatedOn,*/ portUsersId);
        res.status(200).send(portfolio);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getAllUsersWithPortfolioQuery = () => {
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

getAllUsersWithPortfolio = async (req, res) => {
    try {
        const users = await getAllUsersWithPortfolioQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getSpecificUserWithPortfolioQuery = (userId) => {
    const query = `select u.Id, u.Name, u.Surname, p.Cash, i.Name, t.Price, t.Quantity, t.TransactionTypeId 
                    from users as u left join portfolio as p on u.id = p.UsersId join transaction as t on t.PortfolioId = p.Id 
                    join issuers as i on t.IssuersId = i.Id where u.Id = ?`;
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

getSpecificUserWithPortfolio = async (req, res, next) => {
    const userId = req.params.id;
    if (userId <= 0) {
        var error = new Error("id can not be less than 1 !!!");
        error.status = 403;
        next(error);
    } 
    try {
        const user = await getSpecificUserWithPortfolioQuery(userId);
        res.status(200).send(user[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

updateBuyOrWithdrawCashQuery = (id, user) => {
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

updateBuyOrWithdrawCash = async (req, res, next) => {
    const user = req.body;
    const id = req.params.id;
    try {
        const users = await updateBuyOrWithdrawCashQuery(id, user);
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
    getAllUsersWithPortfolio,
    getSpecificUserWithPortfolio,
    updateBuyOrWithdrawCash,
    updateSellCash
}