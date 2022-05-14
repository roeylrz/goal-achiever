import mongoose from 'mongoose';

export const isGoalIdValid = async (goalId) => {
  if (!isValidMongooseObject(goalId)) {
    throw new Error('Goal id is invalid');
  }
};

const isValidMongooseObject = (id) => mongoose.Types.ObjectId.isValid(id);
