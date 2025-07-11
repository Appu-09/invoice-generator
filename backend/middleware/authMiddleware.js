const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  console.log('=== DEBUGGING TOKEN START ===');
  console.log('Received Header:', req.headers.authorization);

  const token = req.headers.authorization?.split(' ')[1];
  console.log('Extracted Token:', token);
  console.log('JWT Secret:', process.env.JWT_SECRET);

  if (!token) {
    return res.status(401).json({ message: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    console.log('JWT Verification Error:', err);
    res.status(400).json({ message: 'Invalid Token' });
  }

  console.log('=== DEBUGGING TOKEN END ===');
};

module.exports = authMiddleware;
