import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  Name: {
    required: true,
    type: String
  },
  Description: {
    type: String,
    default: ''
  },
  Owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  DueDate: {
    type: Date
  },
  Steps: {
    type: [
      {
        Name: {
          required: true,
          type: String
        },
        Description: {
          type: String,
          default: ''
        },
        Completed: {
          type: Boolean,
          default: false
        },
        DueDate: {
          type: Date,
          default: null
        }
      }
    ],
    default: []
  }
});
goalSchema.index({ 'Steps._id': 1 });
const Goal = mongoose.model('Goal', goalSchema);
export { Goal };
