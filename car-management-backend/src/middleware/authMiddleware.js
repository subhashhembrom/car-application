// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization');
//   if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: 'Token is not valid' });
//   }
// };

// export default authMiddleware;

import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if header is present and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Extract token by removing "Bearer " prefix
  const token = authHeader.split(' ')[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded payload to req.user
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;

