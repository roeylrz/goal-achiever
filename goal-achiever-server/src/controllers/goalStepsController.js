import { Goal } from '../models';

export const createStep = async (req, res) => {
  const { Name, Description, DueDate, GoalId } = req.body;
  const createResults = await Goal.updateOne(
    { _id: GoalId },
    { $push: { Steps: { Name, Description, DueDate } } }
  );
  res.status(201).send({ createResults });
};
