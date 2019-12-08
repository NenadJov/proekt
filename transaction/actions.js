const connection = require('../database');

transactionLogQuery = (transactionTypeId, body) => {
    const query = 'INSERT INTO transaction (Price, Quantity, Date, PortfolioId, IssuersId, TransactionTypeId) VALUES (?, ?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [body.Price, body.Quantity, body.Date, body.PortfolioId, body.IssuersId, transactionTypeId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

transactionLog = async(req, res) => {
    const body = req.body;
    const transactionTypeId = req.params.transactionTypeId
    try {
        const result = await transactionLogQuery(transactionTypeId, body);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

getAllTransactionQuery = () => {
    const query = 'SELECT * FROM transaction';
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

getAllTransaction = async (req, res) => {
    try {
        const users = await getAllTransactionQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    transactionLog,
    getAllTransaction
}