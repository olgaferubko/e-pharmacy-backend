import { ONE_DAY } from '../constants/index.js';
import {
  loginUser,
  refreshUser,
  registerUser,
  logoutUser,
} from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const cookieOptions =
  process.env.NODE_ENV === 'production'
    ? { httpOnly: true, sameSite: 'None', secure: true }
    : { httpOnly: true, sameSite: 'Lax', secure: false };

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    ...cookieOptions,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id, {
    ...cookieOptions,
    expires: new Date(Date.now() + ONE_DAY),
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);
  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const refreshUserController = async (req, res) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }
  res.clearCookie('sessionId', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);

  res.status(200).json({
    message: 'Sign out success',
  });
};
