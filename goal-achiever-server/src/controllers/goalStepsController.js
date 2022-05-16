import { Goal } from '../models';

export const createStep = async (req, res) => {
  const { Name, Description, DueDate, GoalId } = req.body;
  const createResults = await Goal.updateOne(
    { _id: GoalId },
    { $push: { Steps: { Name, Description, DueDate } } }
  );
  res.status(201).send({ createResults });
};

export const updateStep = async (req, res) => {
  const stepid = req.params.stepid;
  const { Name, Description, Completed, DueDate } = req.body;
  const updateResult = await Goal.updateOne(
    { 'Steps._id': stepid },
    {
      $set: {
        'Steps.$.Name': Name,
        'Steps.$.Description': Description,
        'Steps.$.Completed': Completed,
        'Steps.$.DueDate': DueDate
      }
    }
  );
  res.status(200).send({ updateResult });
};

export const getAllNextSteps = async (req, res) => {
  const ownerId = req.currentUser.userId;
  const updateResult = await Goal.find(
    {
      Owner: ownerId,
      'Steps.Completed': false
    },
    { Name: 1, Description: 1, DueDate: 1, 'Steps.$': 1 }
  );
  res.status(200).send({ updateResult });
};

export const completeStep = async (req, res) => {
  const stepid = req.params.stepid;
  const updateResult = await Goal.updateOne(
    { 'Steps._id': stepid },
    {
      $set: {
        'Steps.$.Completed': true
      }
    }
  );
  res.status(200).send({ updateResult });
};
