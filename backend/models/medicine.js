import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    }
})

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
  ingredients: [ingredientSchema],
});

//collection name,it's Schema
const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
