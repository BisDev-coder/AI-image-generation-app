import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Please login first',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();
  } catch (error) {
    console.error('Auth error:', error.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default authUser;

                                                // SOME INFO ABOUT THIS MIDDLEWARE
// The job of this middleware is:

// Cookie
//   ↓
// JWT token
//   ↓
// Verify token
//   ↓
// Get user ID
//   ↓
// req.userId
//   ↓
// Protected route

                                                         // Why req.userId?

// Later, when someone generates an image:

// Logged-in User
//       ↓
// authUser
//       ↓
// req.userId
//       ↓
// Generate image
//       ↓
// Save Generation with userId

// So we never trust the frontend to tell us which user owns the history.



// For example, the frontend won't send:

// {
//   "userId": "some-id"
// }

// Instead, the server gets the user ID from the verified JWT.

// This is an important security pattern.