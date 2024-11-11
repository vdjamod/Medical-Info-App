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
  uses: {
    type: String,
    require: true,
  },
  side_effects: [
    {
      type: String,
    },
  ],
  ingredients: [ingredientSchema],
});

//collection name,it's Schema
const Medicine = mongoose.model('Medicine', medicineSchema);

export default Medicine;
