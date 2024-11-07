import { User } from '../models/user.js';
// CRUD
// create
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existedUser = await User.findOne({ email });
    console.log(existedUser);
    if (existedUser) {
      return res.status(404).json({ error: 'email is already taken' });
    }
    const user = await User.create({ username, email, password });
    return res.status(201).json(user);
  } catch (error) {
    console.log('error from signup controller', error);
  }
};
//readd
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    const newUser = await User.findByIdAndUpdate(
      id,
      {
        username,
      },
      { new: true }
    );
    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
  }
};

export const deleteUesr = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.status(200).json({ message: 'user deleted successfully.' });
  } catch (error) {
    console.log(error);
  }
};
