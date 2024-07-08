const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

mongoose.connect(process.env.DBPASSWORD);

const UserSchema = Schema({
  email: {
    type: String,
    required: [true, "User must have an Email"],
  },

  password: {
    type: String,
    required: [true, "User must have a Password"],
  },

  name: {
    type: String,
    required: false,
  },
});

const QuizSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "owner is requried"],
  },
  description: {
    type: String,
  },

  questions: [
    {
      questionText: {
        type: String,
        required: [true, "question must have text"],
      },
      possibleChoices: [
        {
          answerText: {
            type: String,
            required: [true, " answerText is required"],
          },
          isCorrect: {
            type: String,
            required: [true, "Is correct is requried"],
          },
        },
      ],
    },
  ],
});

UserSchema.methods.setPassword = async function (plainPassword) {
  try {
    let hashedWord = await bcrypt.hash(plainPassword, 12);
    this.password = hashedWord;
  } catch (error) {}
};

UserSchema.methods.verifyPassword = async function (plainPassword) {
  // first param is the plane password from user
  //   second one is the hashed one from the user
  let isGood = await bcrypt.compare(plainPassword, this.password);
  return isGood;
};

const Quiz = mongoose.model("Quiz", QuizSchema);
const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
  Quiz,
};
