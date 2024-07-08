const mongoose = require("mongoose");

let uriencodePass = encodeURIComponent("xxSepGang");

mongoose.connect(
  `mongodb+srv://Austin:${uriencodePass}@cluster0.agbc3hd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
);

// how our object will look
// describing our data
// Schema will allow us to store the data on certain terms
//  like the requried means that data is requried to actioin
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student must have name"],
  },
  major: {
    type: String,
    required: [true, "student must have major"],
  },
  age: {
    type: Number,
    required: false,
  },
});

// how it sees our data

const Student = mongoose.model("Student", StudentSchema);

//  when people call our file we will export this
module.exports = {
  Student: Student,
};
