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

export const login = async (req, res, next) => {};
export const logout = async (req, res, next) => {};

const getPlayloadFromUser = (user) => {
  return {
    userId: user.id,
    FirstName: user.FirstName,
    LastName: user.LastName
  };
};
