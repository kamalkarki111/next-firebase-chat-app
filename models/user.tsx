import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  password: {
    type: String,
    required: [true, 'password is required.'],
  },
  username: {
    type: String,
    required: [true, 'username is required.'],
  }
});

const User = models.User || model('User', UserSchema);

export default User;