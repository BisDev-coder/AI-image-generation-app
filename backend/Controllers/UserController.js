import bcrypt from 'bcryptjs';
import User from '../Models/User.js';
import jwt from 'jsonwebtoken';
 

//  REGISTER USER
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Validate fields
//     if (!name || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Name, email and password are required',
//       });
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists',
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (error) {
//     console.error('Register error:', error.message);

//     res.status(500).json({
//       success: false,
//       message: 'Registration failed',
//     });
//   }
// };

// Fix registration auto-login

// There is one important UX issue remaining:
// Currently, after successful registration we show the alert and switch to Login, but the user is not automatically logged in because your backend registration only creates the account.
// For a production-style app, let's make registration automatically log the user in.

// We only need to add JWT creation + cookie, just like your login flow.

//                                                What this changes

                                              // Previously:

// Register
//    ↓
// User created
//    ↓
// No cookie
//    ↓
// User still logged out

                                                         // Now:

// Register
//    ↓
// User created
//    ↓
// JWT created
//    ↓
// JWT stored in cookie
//    ↓
// User is authenticated
//    ↓
// VisionForge opens normally

// Your existing AuthContext.register() already receives the successful response .hen also change register fnction auth context file (in frontend)

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required',
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Store JWT in cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite:
        process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Register error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Registration failed',
    });
  }
};




// USER LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Login failed',
    });
  }
};
// Next we'll create authUser.js, which will verify this JWT and identify the logged-in user.

// next
// Before we build image generation/history, let's give the frontend a way to ask:

// "Is the current browser logged in?"
// Add an is-auth Endpoint

export const isAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth check error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Authentication check failed',
    });
  }
};




// USER LOGOUT
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Logout failed',
    });
  }
};