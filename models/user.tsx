import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, 'password is required.'],
  },
  username: {
    type: String,
    required: [true, 'username is required.'],
  },
  fname: {
    type: String,
    required: [true, 'name is required.']
  }
});

const User = models.User || model('User', UserSchema);

export default User;