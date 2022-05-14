import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  FirstName: {
    type: String,
    required: true
  },
  LastName: {
    type: String
  },
  UserName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
    minlength: 6
  }
});
const User = mongoose.model('User', userSchema);
export { User };
