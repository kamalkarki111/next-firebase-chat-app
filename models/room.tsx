import { Schema, model, models } from 'mongoose';

const RoomSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required.'],
  },
  id: {
    type: String,
    required: [true, 'id is required.'],
  }
});

const Room = models.Room || model('Room', RoomSchema);

export default Room;