const db = require('../db')


function Auth (req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Protected"');
    return res.status(401).send('Authentication required.');
  }
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
  const [username, password] = credentials.split(':');

  const query = `SELECT * FROM view_users_pss WHERE user_name = ? AND pssw = ?`;
  db.get(query, [username, password], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).send('DataBase error occurs');
    }

    if (!row) {
      return res.status(403).send('Access denied.');
    }

     next();
  })};

  module.exports = Auth;
