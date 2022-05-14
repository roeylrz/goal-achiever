import mongoose from 'mongoose';
import { Goal } from '../models';

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
