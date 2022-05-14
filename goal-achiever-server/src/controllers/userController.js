import bcryptjs from 'bcryptjs';
import { createWebToket } from '../authentication';
import { User } from '../models';
import { HttpError } from '../shared/errors';

export const signup = async (req, res, next) => {
  let createdUser;
  const { FirstName, LastName, UserName, Password } = req.body;
  const existingUser = await User.findOne({ UserName });
  if (existingUser) {
    const error = new HttpError(422, 'Username already exists');
    return next(error);
  }
  try {
    const hashedPassword = await bcryptjs.hash(Password, 10);
    createdUser = new User({
      FirstName,
      LastName,
      UserName,
      Password: hashedPassword
    });
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(433, 'Signup field');
    return next(error);
  }
  const payload = getPlayloadFromUser(createdUser);
  let token;
  try {
    token = createWebToket(payload);
  } catch {
    const error = new HttpError(500, 'Signup field, try again later');
    return next(error);
  }
  res.status(201).send({ ...payload, token });
};

export const login = async (req, res, next) => {
  let existingUser;
  try {
    const { UserName, Password } = req.body;
    try {
      existingUser = await User.findOne({ UserName });
    } catch {
      const error = new HttpError(500, 'Login fialed, please try again later');
      return next(error);
    }
    if (!existingUser) {
      const error = new HttpError(401, 'Invalid credentials');
      return next(error);
    }
    const isValidPassword = await bcryptjs.compare(
      Password,
      existingUser.Password
    );
    if (!isValidPassword) {
      const error = new HttpError(401, 'Invalid credentials');
      return next(error);
    }
  } catch (error) {
    throw new Error(error.message);
  }
  let token;
  const payload = getPlayloadFromUser(existingUser);
  try {
    token = createWebToket(payload);
  } catch {
    const error = new HttpError(500, 'Signup field, try again later');
    return next(error);
  }
  res.status(200).send({ ...payload, token });
};

export const logout = async (req, res, next) => {};

const getPlayloadFromUser = (user) => {
  return {
    userId: user.id,
    FirstName: user.FirstName,
    LastName: user.LastName
  };
};
