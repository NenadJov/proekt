const connection = require('../database');

getAllIssuersQuery = () => {
    const query = 'SELECT * FROM issuers';
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

getAllIssuers = async (req, res) => {
    try {
        const users = await getAllIssuersQuery();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

createIssuerQuery = (issuerTypeId, post) => {
    const query = 'INSERT INTO issuers (Name, Exchange, LastPrice, Volume, IssuerTypeId) VALUES (?, ?, ?, ?,?)';
    return new Promise((resolve, reject) => {
        connection.query(query, [post.Name, post.Exchange, post.LastPrice, post.Volume, issuerTypeId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results)
            }
          });
    });
};

createIssuer = async(req, res) => {
    const post = req.body;
    const issuerTypeId = req.params.issuerTypeId
    try {
        const result = await createIssuerQuery(issuerTypeId, post);
        res.status(201).send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllIssuers,
    createIssuer
}