import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  refreshUser,
  registerUser,
  logoutUser,
} from '../services/auth.js';
import { UsersCollection } from '../db/models/user.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
};

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
      user: {
        id: session.user._id,
        name: session.user.name,
        email: session.user.email,
      },
    },
  });
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  const user = await UsersCollection.findById(session.userId).select("name email _id");

  res.status(200).json({
    status: 200,
    message: "Successfully refreshed a session!",
    data: {
      accessToken: session.accessToken,
      user,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(200).json({
    message: 'Sign out success',
  });
};
