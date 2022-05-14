import mongoose from 'mongoose';
import { Goal } from '../models';
import { HttpError } from '../shared/errors';

export const getGoalById = async (req, res) => {
  const goalid = req.params.goalid;
  const goal = await Goal.findById(goalid);
  res.send({ goal });
};

export const getGoalsByOwner = async (req, res) => {
  const userId = req.currentUser.userId;
  const goals = await Goal.aggregate([
    {
      $match: {
        Owner: mongoose.Types.ObjectId(userId)
      }
    },
    {
      $project: {
        _id: 1,
        Name: 1,
        Description: 1,
        Owner: 1,
        DueDate: 1,
        Steps: 1,
        Completed: {
          $and: [
            {
              $gt: [{ $size: '$Steps' }, 0]
            },
            {
              $eq: [
                {
                  $size: {
                    $filter: {
                      input: '$Steps',
                      as: 'step',
                      cond: { $eq: ['$$step.Completed', false] }
                    }
                  }
                },
                0
              ]
            }
          ]
        }
      }
    }
  ]);

  res.send({ goals });
};

export const createGoal = async (req, res, next) => {
  const ownerId = req.currentUser.userId;
  const { Name, Description, DueDate, Steps } = req.body;

  const existingGoal = await Goal.findOne({ Owner: ownerId, Name });
  if (existingGoal) {
    const error = new HttpError(422, 'Goal name already exists');
    return next(error);
  }
  const createdGoal = new Goal({
    Name,
    Description,
    DueDate,
    Steps,
    Owner: ownerId
  });
  await createdGoal.save();
  res.status(201).send({ createdGoal });
};

export const updateGoal = async (req, res, next) => {
  const ownerId = req.currentUser.userId;
  const goalid = req.params.goalid;
  const { Name, Description, DueDate, Steps } = req.body;

  const existingGoal = await Goal.findById(goalid);
  if (!existingGoal) {
    const error = new HttpError(404, 'Could not find goal for the provided id');
    return next(error);
  }
  if (Name !== existingGoal.Name) {
    const existingGoalWithSameName = await Goal.findOne({
      Owner: ownerId,
      Name
    });
    if (existingGoalWithSameName) {
      const error = new HttpError(422, 'Goal name already exists');
      return next(error);
    }
  }
  existingGoal.set({
    Name,
    Description,
    DueDate,
    Steps
  });
  await existingGoal.save();
  res.status(200).send({ existingGoal });
};
