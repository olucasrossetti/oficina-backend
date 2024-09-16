// middleware/auth.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token)
    return res.status(403).json({ message: 'Nenhum token fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(500).json({ message: 'Falha ao autenticar o token' });
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;
