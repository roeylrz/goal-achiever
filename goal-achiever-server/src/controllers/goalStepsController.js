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
