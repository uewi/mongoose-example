const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('open');
  })
  .catch((e) => {
    console.log(e);
  });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: Number,
  about: String,
  isOnline: Boolean,
});

userSchema.methods.speak = function speak() {
  console.log('My username is ' + this.username);
};

userSchema.statics.allOnline = function () {
  return this.updateMany({}, { isOnline: true });
};

const User = mongoose.model('User', userSchema);

const user1 = new User({
  username: 'Joe',
  age: 20,
  about: 'I am Joe',
  isOnline: true,
});
user1.save();

User.insertMany([
  { username: 'Jane', age: 20, about: 'I am Jane', isOnline: false },
  { username: 'John', age: 20, about: 'I am John', isOnline: false },
]).then((data) => {
  console.log('inserted');
});

User.allOnline().then((data) => {
  console.log(data);
});
