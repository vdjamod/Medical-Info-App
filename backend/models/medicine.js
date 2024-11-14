import mongoose from "mongoose";

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  expiryDate: {
    type: Date
  },
  manufacturer: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  uses: [
    {
      type: String,
    }
  ],
  sideEffects: [
    {
      type: String,
    },
  ],
  ingredients: [
    {
      name: String,
      description: String,
      quantity: Number
    }
  ],
});

//collection name,it's Schema
const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
