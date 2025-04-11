import mongoose from 'mongoose';

const ResidentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type:Number,
    required: true,
    min: 0,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  isCurrentlyPresent: {
    type: Boolean,
    default: true
  },
  isNowRehabilited: {
    type: Boolean,
    default: false
  },
  isAlive: {
    type: Boolean,
    default: true
  },
  photoOfPerson: {
    type: String,
    required: true
  },
  addharCard: {
    type: String,
    required: true
  },
  medicalReportPhoto: {
    type: String,
    required: true
  },
  registeredAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Resident || mongoose.model('Resident', ResidentSchema);
